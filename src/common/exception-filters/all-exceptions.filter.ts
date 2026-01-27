import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus?.() || 500;

    Logger.error(`HTTP Status: ${status} Error Message: ${exception.message}`);

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      const response = ctx.getResponse<Response>();
      let message = 'Internal server error';

      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        message = (exceptionResponse as Record<string, string>).message;
      }

      response.status(status).json({
        ok: false,
        data: {
          message,
        },
        meta: {
          path: request.url,
          timestamp: new Date().toISOString(),
        },
      });
    }

    return;
  }
}
