import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import categoryFactory from '../factories/category.factory';
import fundFactory from '../factories/fund.factory';
import transactionFactory from '../factories/transaction.factory';
import userProfileFactory from '../factories/user-profile.factory';
import CategorySeeder from './category.seeder';
import FundSeeder from './fund.seeder';
import UserSeeder from './user.seeder';
import TransactionSeeder from './transaction.seeder';
import TransactionTypeSeeder from './transaction-type.seeder';
import AvatarGroupSeeder from './avatar-group.seeder';
import ProfileAvatarSeeder from './profile-avatar.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [
        AvatarGroupSeeder,
        ProfileAvatarSeeder,
        UserSeeder,
        CategorySeeder,
        FundSeeder,
        TransactionTypeSeeder,
        TransactionSeeder,
      ],
      factories: [
        categoryFactory,
        fundFactory,
        userProfileFactory,
        transactionFactory,
      ],
    });
  }
}
