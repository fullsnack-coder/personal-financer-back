import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: Equal(username) });
  }

  findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: Equal(userId) },
      select: {
        passwordHash: false,
      },
    });
  }

  createAccountUser(userData: Partial<User>): Promise<User> {
    const accountUser = this.userRepository.create(userData);
    return accountUser.save();
  }
}
