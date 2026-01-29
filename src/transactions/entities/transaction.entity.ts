import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackeableEntity } from '../../database/entities/trackeable-entity.entity';
import { Fund } from '../../funds/entities/fund.entity';
import { TransactionType } from './transaction-type.entity';

@Entity()
export class Transaction extends TrackeableEntity {
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

  @Column({ type: 'nvarchar', nullable: true })
  description?: string;

  @Column({ type: 'nvarchar', length: 3, nullable: false, default: 'USD' })
  currencyCode: string;

  @ManyToOne(() => TransactionType, (type) => type.id, { nullable: false })
  transactionType: TransactionType;
}
