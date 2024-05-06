import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'USDC' })
  tokenName: string;

  @Column({ default: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' })
  tokenAddress: string;

  @Column({ type: 'numeric' })
  blockNumber: number;

  @Column()
  walletAddress: string;

  @Column({ type: 'numeric', precision: 78, scale: 0, default: '0' })
  balanceWei: number;

  @Column({ type: 'decimal', precision: 16, scale: 4, default: '0.00' })
  totalPrice: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date; // Deletion date
}
