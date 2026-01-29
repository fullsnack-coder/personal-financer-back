import { Controller, Get } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';

@Controller('transaction-types')
export class TransactionTypesController {
  constructor(private transactionTypesService: TransactionTypesService) {}

  @Get()
  findAll() {
    return this.transactionTypesService.findAll();
  }
}
