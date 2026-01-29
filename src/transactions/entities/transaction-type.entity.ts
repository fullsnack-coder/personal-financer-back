import { TrackeableEntity } from '@/database/entities/trackeable-entity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionTypeName } from '../types/transaction-type-name.enum';

@Entity()
export class TransactionType extends TrackeableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionTypeName,
    unique: true,
    nullable: false,
    default: TransactionTypeName.EXPENSE,
  })
  typeName: TransactionTypeName;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionType)
  transactions: Array<Transaction>;

  @Column('int', { nullable: false, default: 1 })
  sign: number;
}
