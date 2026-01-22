import { Category } from 'src/categories/entities/category.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Fund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'string' })
  description: string;

  @Column('money')
  balance: number;

  @ManyToOne(() => Category, (category) => category.funds, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Transaction, (transaction) => transaction.fund)
  transactions: Array<Transaction>;
}
