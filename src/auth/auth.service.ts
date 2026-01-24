import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { UserProfileService } from '@/user-profile/user-profile.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userProfileService: UserProfileService,
  ) {}

  private async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      select: {
        passwordHash: false,
      },
    });
  }

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

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already taken');
    }

    const createUserPayload = this.userRepository.create({
      username,
      passwordHash,
      email,
    });

    const registeredUser = await this.userRepository.save(createUserPayload);

    await this.userProfileService.registerProfile(
      registeredUser.id,
      profileData,
    );
  }

  async login({ username, password }: LoginAccountDto) {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' },
    );

    return { sessionToken: token };
  }
}
