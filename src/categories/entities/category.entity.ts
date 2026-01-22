import { Fund } from 'src/funds/entities/fund.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'string' })
  description: string;

  @Column({ type: 'string' })
  coverImageUrl: string;

  @OneToMany(() => Fund, (fund) => fund.category)
  funds: Array<Fund>;
}
