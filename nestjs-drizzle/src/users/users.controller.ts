import { Controller, Get, Param } from '@nestjs/common';
import type { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
