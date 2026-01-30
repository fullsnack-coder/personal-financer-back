import { Type } from 'class-transformer';
import {
  IsISO4217CurrencyCode,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SearchStatisticDto {
  @IsString()
  @IsISO4217CurrencyCode()
  currency: string;

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
