import { TrackeableEntity } from '@/database/entities/trackeable-entity.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class UserDevice extends TrackeableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  deviceToken: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
}
