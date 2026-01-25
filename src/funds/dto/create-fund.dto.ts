import { IsNumber, IsString } from 'class-validator';

export class CreateFundDto {
  @IsString()
  name: string;

  @IsNumber()
  initialBalance: number;

  @IsNumber()
  categoryId: number;
  // TODO: add field to store currency type and description
}
