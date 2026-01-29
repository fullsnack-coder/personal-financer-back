import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackeableEntity } from '../../database/entities/trackeable-entity.entity';
import UserProfile from '../../user-profile/entities/user-profile.entity';
import { Fund } from '../../funds/entities/fund.entity';

@Entity()
export class User extends TrackeableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  passwordHash: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  profile?: UserProfile;

  @OneToMany(() => Fund, (fund) => fund.user)
  funds: Array<Fund>;
}
