import { User } from '../../accounts/entities/user.entity';
import { TrackeableEntity } from '../../database/entities/trackeable-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileAvatar } from './profile-avatar.entity';

@Entity()
class UserProfile extends TrackeableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'datetime', nullable: true })
  birthDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl?: string;

  @OneToOne(() => User, (user: User) => user.profile, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ProfileAvatar, (avatar) => avatar.userProfiles, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'profileAvatarId' })
  profileAvatar?: ProfileAvatar;
}

export default UserProfile;
