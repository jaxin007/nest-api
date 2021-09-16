import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  @InjectRepository(UsersEntity)
  private readonly usersRepository: Repository<UsersEntity>;

  async getUser(id: number): Promise<UsersEntity> {
    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async getAllUsers(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const password = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepository.save({ ...createUserDto, password });
  }
}
