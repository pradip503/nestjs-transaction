import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { WalletStatus } from '../entities/wallet.entity';

export class CreateWalletDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  user: string;
}

export class UpdateWalletStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: WalletStatus;
}

export class TransferAmountDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  fromUser: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  toUser: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class RechargeWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
