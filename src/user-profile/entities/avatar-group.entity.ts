import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileAvatar } from './profile-avatar.entity';
import { TrackeableEntity } from '@/database/entities/trackeable-entity.entity';

@Entity()
export class AvatarGroup extends TrackeableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  groupName: string;

  @OneToMany(() => ProfileAvatar, (avatar) => avatar.group)
  avatars: Array<ProfileAvatar>;
}
