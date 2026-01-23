import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfileService } from '@/user-profile/user-profile.service';

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

  async register() {
    //await this.userProfileService.registerProfile();
    // Registration logic here
  }

  login() {
    // Login logic here
  }
}
