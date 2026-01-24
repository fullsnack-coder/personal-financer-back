import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAccountDto) {
    return this.authService.login(loginDto);
  }
}
