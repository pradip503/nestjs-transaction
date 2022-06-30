import { WalletService } from './../wallet/wallet.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => WalletService))
    private walletService: WalletService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const savedUser = await this.userRepo.save(createUserDto);
      savedUser && this.walletService.create({ user: savedUser.id });
      return savedUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(userId: string) {
    try {
      return await this.userRepo.findOneOrFail({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
