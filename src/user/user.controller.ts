import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const savedUser = await this.userService.createUser(dto);

    // Transform entity -> response DTO by omitting password
    const { password, ...rest } = savedUser;
    return rest as UserResponseDto;
  }
}