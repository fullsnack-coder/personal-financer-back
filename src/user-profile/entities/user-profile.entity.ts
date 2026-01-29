import { User } from '../../accounts/entities/user.entity';
import { TrackeableEntity } from '../../database/entities/trackeable-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export default UserProfile;
