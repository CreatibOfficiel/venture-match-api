import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    // Check if user with same email already exists    
    const existing = await this.userRepository.findOne({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('Email already in use.');
    }
  
    if (!data.password) {
      throw new Error('Password is required.');
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
    // Create and save the user
    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
