import type { SessionPayload } from '@/types/auth';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TransactionsService } from '../transactions.service';

@Injectable()
export class TransactionOwnerGuard implements CanActivate {
  constructor(private transactionsService: TransactionsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as SessionPayload;
    const transactionId = request.params.id;

    return this.isOwner(user.id, transactionId);
  }

  private async isOwner(
    userId: string,
    transactionId: string,
  ): Promise<boolean> {
    const transaction = await this.transactionsService.findOne(transactionId);

    console.log(JSON.stringify({ userId, transaction }, null, 2));

    const transactionOwner = transaction?.fund?.user;

    if (!transactionOwner || transactionOwner.id !== userId) {
      throw new UnauthorizedException('You do not own this transaction');
    }

    return true;
  }
}
