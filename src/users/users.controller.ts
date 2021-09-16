import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  HttpCode,
  Controller,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { classToPlain } from 'class-transformer';

@Controller('/users')
export class UsersController {
  @Inject() private readonly usersService: UsersService;

  @Get('/:id')
  async getUsers(@Param('id') id: number) {
    return await this.usersService.getUser(id);
  }

  @Get('/')
  async getAllUsers() {
    return classToPlain(await this.usersService.getAllUsers());
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.createUser(body);
  }
}
