import { Fund } from '@/funds/entities/fund.entity';
import { TransactionType } from '@/transactions/entities/transaction-type.entity';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { TransactionTypeName } from '@/transactions/types/transaction-type-name.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class TransactionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const fundRepository = dataSource.getRepository(Fund);
    const [firstFund, secondFund] = await fundRepository.find();

    const transactionTypeRepository = dataSource.getRepository(TransactionType);
    const transactionType = await transactionTypeRepository.findOneByOrFail({
      typeName: TransactionTypeName.EXPENSE,
    });

    const transactionFactory = factoryManager.get(Transaction);

    await transactionFactory.saveMany(10, {
      fund: firstFund,
      transactionType,
    });

    await transactionFactory.saveMany(5, {
      fund: secondFund,
      transactionType,
    });
  }
}
