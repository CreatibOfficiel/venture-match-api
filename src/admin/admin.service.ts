import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieve a list of all users in the system.
   */
  findAllUsers() {
    return this.userService.findAll();
  }
}