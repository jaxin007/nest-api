import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const password = await bcrypt.hash(updateUserDto.password, 10);

    const updatedUser = await this.usersRepository.update(
      {
        id,
      },
      {
        ...updateUserDto,
        password,
      },
    );

    if (!updatedUser.affected) {
      throw new NotFoundException();
    }

    return updatedUser;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const deletedUser = await this.usersRepository.delete({
      id,
    });

    if (!deletedUser.affected) {
      throw new NotFoundException();
    }

    return deletedUser;
  }
}
