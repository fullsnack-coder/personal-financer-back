import { Fund } from '../../funds/entities/fund.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fund, (fund) => fund.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fund_id' })
  fund: Fund;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'nvarchar', nullable: true })
  voucherImageUrl?: string;
}

// TODO: Add date of transaction field
// TODO: Add description of transaction field
