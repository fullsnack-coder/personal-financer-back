import { User } from '../../accounts/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
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

  @Column({ type: 'varchar' })
  title: string;

  @Column('decimal', { precision: 15, scale: 2 })
  balance: number;

  @Column({ type: 'nvarchar', nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category): Array<Fund> => category.funds, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Transaction, (transaction) => transaction.fund)
  transactions: Array<Transaction>;

  @ManyToOne(() => User, (user) => user.funds, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
