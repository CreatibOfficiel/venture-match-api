import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // For now, we'll just have a findAll returning all user records (though empty)
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
