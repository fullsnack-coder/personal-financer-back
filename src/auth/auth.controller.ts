import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import type { Response as AuthResponse } from 'express';
import { isProduction } from '@/common/utils/environments';
import type { SessionPayload } from '@/types/auth';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { CurrentSession } from './decorators/current-session.decorator';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import RegisterDeviceDTO from './dto/register-device.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('device')
  @UseGuards(AuthGuard)
  registerDeviceToken(
    @CurrentSession() { id: userId }: SessionPayload,
    @Body() { deviceToken }: RegisterDeviceDTO,
  ) {
    return this.authService.registerDeviceToken(userId, deviceToken);
  }

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
      sameSite: 'lax',
      secure: isProduction(),
      expires: new Date(Date.now() + 3600000), // 1 hour
    });

    return res.send({
      message: 'Login successful',
      session: loginResult.sessionToken,
    });
  }
}
