import { TransactionType } from '@/transactions/entities/transaction-type.entity';
import { TransactionTypeName } from '@/transactions/types/transaction-type-name.enum';

export default class TransactionTypeFactory {
  static createExpenseType(): TransactionType {
    const transactionType = new TransactionType();
    transactionType.typeName = TransactionTypeName.EXPENSE;
    transactionType.sign = -1;

    return transactionType;
  }

  static createIncomeType(): TransactionType {
    const transactionType = new TransactionType();
    transactionType.typeName = TransactionTypeName.INCOME;
    transactionType.sign = 1;

    return transactionType;
  }
}
