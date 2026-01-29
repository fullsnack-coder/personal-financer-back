import { Transaction } from '@/transactions/entities/transaction.entity';
import { setSeederFactory } from 'typeorm-extension';

const transactionFactory = setSeederFactory(Transaction, (faker) => {
  const transaction = new Transaction();

  transaction.amount = parseFloat(
    faker.finance.amount({
      min: 10,
      max: 1000,
      dec: 2,
    }),
  );

  transaction.description = faker.word.verb();
  transaction.currencyCode = faker.finance.currencyCode();

  return transaction;
});

export default transactionFactory;
