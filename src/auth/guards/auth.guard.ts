import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const sessionToken = (request.cookies as Record<string, string>)[
      'session_token'
    ];

    if (!sessionToken) {
      return false;
    }

    const isValid = jwt.verify(
      sessionToken,
      process.env.JWT_SECRET || 'default_secret',
    );

    return !!isValid;
  }
}
