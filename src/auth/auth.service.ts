import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { User } from '@/accounts/entities/user.entity';
import UserProfile from '@/user-profile/entities/user-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly dataSource: DataSource,
  ) {}

  async register({
    username,
    password,
    repeatPassword,
    email,
    ...profileData
  }: RegisterAccountDto) {
    const passwordHash = await bcrypt.hash(password, 10);

    if (password !== repeatPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.accountsService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        const user = manager.create(User, {
          username,
          email,
          passwordHash,
        });

        await manager.save(user);

        const userProfile = manager.create(UserProfile, {
          ...profileData,
          user: user,
        });

        await manager.save(userProfile);

        return user;
      });
    } catch (error) {
      Logger.error('Registration error:', error);
      throw new BadRequestException('Registration failed');
    }

    return { message: 'Registration successful' };
  }

  async login({ username, password }: LoginAccountDto) {
    const user = await this.accountsService.findByUsername(username);

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' },
    );

    return { sessionToken: token };
  }
}
