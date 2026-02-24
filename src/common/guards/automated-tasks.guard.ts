import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AutomatedTasksGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const secretHeader =
      new Headers(request.headers as Record<string, string>).get(
        'x-automated-task-secret',
      ) || '';

    const expectedSecret =
      this.configService.get<string>('AUTOMATED_TASK_SECRET') ||
      'default_secret';

    return bcrypt.compare(secretHeader, expectedSecret);
  }
}
