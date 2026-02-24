import { IsBoolean, IsString, ValidateIf } from 'class-validator';

export default class UpdateProfilePreferenceDTO {
  @IsString()
  preferenceKey: string;

  @ValidateIf((_, value) => typeof value === 'string')
  @IsString()
  @ValidateIf((_, value) => typeof value === 'boolean')
  @IsBoolean()
  preferenceValue: string | boolean;
}
