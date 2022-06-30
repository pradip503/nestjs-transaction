import { Controller, Body, Patch, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  RechargeWalletDto,
  TransferAmountDto,
  UpdateWalletStatusDto,
} from './dto/create-wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';

@Controller('wallet')
@ApiTags('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly connection: Connection,
  ) {}

  @Patch('updateStatus/:userId')
  modifyWalletStatus(
    @Param('userId') userId: string,
    @Body() updateWalletStatusDto: UpdateWalletStatusDto,
  ) {
    return this.walletService.modifyWalletStatus(
      userId,
      updateWalletStatusDto.status,
    );
  }

  @Post('recharge/:userId')
  rechargeAmount(
    @Param('userId') userId: string,
    @Body() { amount }: RechargeWalletDto,
  ) {
    return this.walletService.modifyWalletAmount(userId, amount, 'add');
  }

  @Post('transfer')
  async transferAmount(@Body() transferAmountDto: TransferAmountDto) {
    return await this.connection.transaction((transactionManager) => {
      return this.walletService
        .withTransaction(transactionManager)
        .transferWalletAmount(transferAmountDto);
    });
  }
}
