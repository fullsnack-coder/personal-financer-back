import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthDate?: Date;
}
