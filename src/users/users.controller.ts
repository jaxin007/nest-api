import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  HttpCode,
  Controller,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { classToPlain } from 'class-transformer';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('/users')
export class UsersController {
  @Inject() private readonly usersService: UsersService;

  @Get('/:id')
  async getUsers(@Param('id') id: number) {
    return classToPlain(await this.usersService.getUser(id));
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

  @Patch('/:id')
  @HttpCode(204)
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    await this.usersService.updateUser(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
  }
}
