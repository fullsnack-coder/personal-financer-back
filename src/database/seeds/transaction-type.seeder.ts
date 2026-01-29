import { TransactionType } from '@/transactions/entities/transaction-type.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import TransactionTypeFactory from '../factories/transaction-type.factory';

export default class TransactionTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const transactionTypeRepository = dataSource.getRepository(TransactionType);

    const transactionTypeFactory = TransactionTypeFactory;

    for (const transactionTypeBody of [
      transactionTypeFactory.createExpenseType(),
      transactionTypeFactory.createIncomeType(),
    ]) {
      const transactionType =
        await transactionTypeRepository.save(transactionTypeBody);

      await transactionTypeRepository.save(transactionType);
    }
  }
}
