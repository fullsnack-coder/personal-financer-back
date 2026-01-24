import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';
import { CreateProfileDto } from '@/user-profile/dto/create-profile.dto';

export class RegisterAccountDto extends CreateProfileDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsString({ message: 'Repeat Password must be a string' })
  @Match('password', { message: 'Passwords do not match' })
  repeatPassword: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  email: string;
}
