import { Column, Entity, OneToOne } from 'typeorm';
import { TrackeableEntity } from '../../database/entities/trackeable-entity.entity';
import UserProfile from '../../user-profile/entities/user-profile.entity';

@Entity()
export class User extends TrackeableEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  profile?: UserProfile;
}
