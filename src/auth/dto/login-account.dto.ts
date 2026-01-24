import { IsString, Matches, MinLength } from 'class-validator';

export class LoginAccountDto {
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
}
