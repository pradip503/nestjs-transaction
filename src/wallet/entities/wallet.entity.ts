import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum WalletStatus {
  Active = 'Active',
  Dormant = 'Dormant',
}

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: WalletStatus,
    default: WalletStatus.Active,
  })
  walletStatus: WalletStatus;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
