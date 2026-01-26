import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionPayload } from '@/types/auth';

export const CurrentSession = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): SessionPayload => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user!;
  },
);
