import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  avatarUrl?: string;
}
