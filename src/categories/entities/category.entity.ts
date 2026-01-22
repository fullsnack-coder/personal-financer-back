import { Fund } from '../../funds/entities/fund.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'nvarchar' })
  coverImageUrl: string;

  @OneToMany(() => Fund, (fund) => fund.category)
  funds: Array<Fund>;
}
