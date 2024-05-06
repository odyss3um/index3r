import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TokenPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'USDC' })
  tokenName: string;

  @Column({ default: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' })
  tokenAddress: string;

  @Column()
  price: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date; // Deletion date
}
