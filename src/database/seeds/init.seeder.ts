import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import categoryFactory from '../factories/category.factory';
import fundFactory from '../factories/fund.factory';
import CategorySeeder from './category.seeder';
import FundSeeder from './fund.seeder';
import UserSeeder from './user.seeder';
import userProfileFactory from '../factories/user-profile.factory';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, CategorySeeder, FundSeeder],
      factories: [categoryFactory, fundFactory, userProfileFactory],
    });
  }
}
