import { Type } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class SearchStatisticDto {
  @IsOptional()
  @IsUUID()
  fundId?: string;

  @Type(() => Date)
  @IsOptional()
  from?: Date;

  @Type(() => Date)
  @IsOptional()
  to?: Date;
}
