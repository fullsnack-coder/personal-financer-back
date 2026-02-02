import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AvatarGroup } from './avatar-group.entity';
import UserProfile from './user-profile.entity';
import { TrackeableEntity } from '@/database/entities/trackeable-entity.entity';

@Entity()
export class ProfileAvatar extends TrackeableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  url: string;

  @ManyToOne(() => AvatarGroup, (group) => group.avatars)
  @JoinColumn({ name: 'groupId' })
  group: AvatarGroup;

  @OneToMany(() => UserProfile, (profile) => profile.profileAvatar)
  userProfiles: Array<UserProfile>;
}
