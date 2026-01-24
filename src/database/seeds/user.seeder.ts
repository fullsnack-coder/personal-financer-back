import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import UserProfile from '../../user-profile/entities/user-profile.entity';
import { User } from '../../accounts/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    await userRepository
      .create({
        username: 'john_doe',
        passwordHash: bcrypt.hashSync('123123123', 10),
      })
      .save();

    const [firstUser] = await userRepository.find();

    const profileFactory = factoryManager.get(UserProfile);

    await profileFactory.saveMany(1, {
      user: firstUser,
    });
  }
}
