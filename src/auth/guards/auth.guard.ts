import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from '@/types/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const cookies = (request.cookies as Record<string, string>) || {};
    const headers = request.headers || {};

    const sessionToken =
      cookies['session_token'] ||
      headers['authorization']?.replace('Bearer ', '');

    if (!sessionToken) {
      throw new UnauthorizedException('No session token provided');
    }

    try {
      const sessionPayload = jwt.verify(
        sessionToken,
        process.env.JWT_SECRET || 'default_secret',
      );

      request.user = sessionPayload as AuthPayload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid session token');
    }
  }
}
