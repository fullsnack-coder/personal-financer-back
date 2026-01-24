import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Fund } from '../../funds/entities/fund.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../accounts/entities/user.entity';

export default class FundSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    const userRepository = dataSource.getRepository(User);

    const [firstCategory] = await categoryRepository.find();
    const [firstUser] = await userRepository.find();
    const fundFactory = factoryManager.get(Fund);

    await fundFactory.saveMany(10, {
      category: firstCategory,
      user: firstUser,
    });
  }
}
