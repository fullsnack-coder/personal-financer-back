import { Category } from '../../categories/entities/category.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CategorySeeder implements Seeder {
  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryFactory = factoryManager.get(Category);

    await categoryFactory.saveMany(10);
  }
}
