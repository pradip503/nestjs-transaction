import { Controller, Body, Patch, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  RechargeWalletDto,
  TransferAmountDto,
  UpdateWalletStatusDto,
} from './dto/create-wallet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('wallet')
@ApiTags('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

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
  transferAmount(@Body() transferAmountDto: TransferAmountDto) {
    return this.walletService.transferWalletAmount(transferAmountDto);
  }
}
