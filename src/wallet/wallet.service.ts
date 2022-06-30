import { Wallet, WalletStatus } from './entities/wallet.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWalletDto, TransferAmountDto } from './dto/create-wallet.dto';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
    private userService: UserService,
  ) {}
  async create({ user }: CreateWalletDto) {
    try {
      const userToSave = await this.userService.findOne(user);
      return await this.walletRepo.save({ user: userToSave, amount: 0 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async modifyWalletAmount(
    userId: string,
    amount: number,
    action: 'add' | 'subtract',
  ) {
    try {
      const user = await this.userService.findOne(userId);
      const walletToUpdate = await this.walletRepo.findOneOrFail({
        where: { user },
      });
      if (action === 'add') {
        walletToUpdate.amount = walletToUpdate.amount + amount;
      }
      if (action === 'subtract') {
        walletToUpdate.amount = walletToUpdate.amount - amount;
      }
      return await this.walletRepo.save(walletToUpdate);
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async modifyWalletStatus(userId: string, status: WalletStatus) {
    try {
      const user = await this.userService.findOne(userId);
      return await this.walletRepo.update(
        {
          user,
        },
        { walletStatus: status },
      );
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async transferWalletAmount({ fromUser, toUser, amount }: TransferAmountDto) {
    try {
      /**
       * TODO 1: Check if source account has the amount and check if not in dormant stage
       * TODO 2: Subtract the source account
       * TODO 3: Check if destination account is not in dormant stage
       * TODO 4: Add the amount to destination account
       */
      const fromUserData = await this.userService.findOne(fromUser);
      const toUserData = await this.userService.findOne(toUser);

      const { amount: fromWalletAmount, walletStatus: fromWalletStatus } =
        await this.walletRepo.findOneOrFail({
          where: { user: fromUserData },
        });

      const { walletStatus: toWalletStatus } =
        await this.walletRepo.findOneOrFail({
          where: { user: toUserData },
        });

      if (fromWalletAmount < amount) {
        throw new BadRequestException('Insufficient wallet amount!');
      }

      if (fromWalletStatus === WalletStatus.Dormant) {
        throw new BadRequestException('Source account is dormant!');
      }

      await this.modifyWalletAmount(fromUser, amount, 'subtract');

      if (toWalletStatus === WalletStatus.Dormant) {
        throw new BadRequestException('Target account is dormant!');
      }

      await this.modifyWalletAmount(toUser, amount, 'add');

      return 'Transfer successfull!';
    } catch (error) {
      console.log(error.messsage);
      throw new BadRequestException(error.message);
    }
  }
}
