import { User } from '@/accounts/entities/user.entity';
import { TrackeableEntity } from '@/database/entities/trackeable-entity.entity';
import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class ProfilePreferences extends TrackeableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn({ type: 'varchar', nullable: false })
  preferenceKey: string;

  @PrimaryColumn({ type: 'varchar', nullable: false })
  preferenceValue: string;

  @ManyToOne(() => User, (user) => user.profilePreferences, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
