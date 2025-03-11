import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): User[] | PromiseLike<User[]> {
    throw new Error('Method not implemented.');
  }

  async createUser(data: Partial<User>): Promise<User> {
    // Check if user with same email already exists
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (existing) {
      throw new ConflictException('Email already in use.');
    }

    // Create and save user
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }
}
