import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFundDto {
  @IsString()
  name: string;

  @IsNumber()
  initialBalance: number;

  @IsNumber()
  categoryId: number;

  @IsString()
  @IsOptional()
  currencyCode?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
