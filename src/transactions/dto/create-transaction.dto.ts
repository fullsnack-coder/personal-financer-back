export class CreateTransactionDto {
  fundId: string;
  amount: number;
  transactionFile?: Express.Multer.File;
}
