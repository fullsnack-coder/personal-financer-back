import { AuthPayload } from '@/types/auth';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { FundsService } from '../funds.service';

@Injectable()
export class FundOwnerGuard implements CanActivate {
  constructor(private fundsService: FundsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as AuthPayload;
    const fundId = request.params.id;

    return this.isOwner(user.id, fundId);
  }

  private async isOwner(userId: string, fundId: string): Promise<boolean> {
    const fund = await this.fundsService.findOne(fundId);
    const fundOwner = fund?.user;

    if (!fundOwner || fundOwner.id !== userId) {
      throw new UnauthorizedException('You do not own this fund');
    }

    return true;
  }
}
