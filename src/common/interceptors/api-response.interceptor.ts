import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import type { APIResponse } from '../types/api-response.interceptor';

export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, APIResponse<T>>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<APIResponse<T>> | Promise<Observable<APIResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        const result = { ok: true } as APIResponse<T>;

        result.data = data;

        if (typeof data === 'object' && data !== null && 'pagination' in data) {
          const { pagination, data: paginatedData } = data;
          result.data = paginatedData as T;
          result.meta = pagination;
        }

        return result;
      }),
      catchError((error: Error) => {
        Logger.error('Error in ApiResponseInterceptor:', error);

        return throwError(
          () => new InternalServerErrorException('Internal server error'),
        );
      }),
    );
  }
}
