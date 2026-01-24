import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import type { Response as AuthResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  @Post('login')
  async login(
    @Response() res: AuthResponse,
    @Body() loginDto: LoginAccountDto,
  ) {
    const loginResult = await this.authService.login(loginDto);

    res.cookie('session_token', loginResult.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.send({ message: 'Login successful' });
  }
}
