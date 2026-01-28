export class CreateTransactionDto {
  fundId: string;
  amount: number;
  description?: string;
  transactionFile?: Express.Multer.File;
}
