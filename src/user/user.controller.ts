import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() userData: { email: string; password: string }): Promise<User> {
    // Basic creation
    return this.userService.createUser(userData);
  }
}