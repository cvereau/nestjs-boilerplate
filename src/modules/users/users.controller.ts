import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
      private readonly userService: UsersService,
  ) {}

  @Get()
  public async find() {
      return await this.userService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateUserDto) {
      return await this.userService.create(body);
  }
}