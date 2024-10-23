import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user-entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExists = await this.findByEmail(createUserDto.email);

      if (userAlreadyExists) {
        throw new ConflictException('Email already in use!', {
          cause: new Error(),
        });
      }

      const password_hash = await hash(createUserDto.password, 6);

      const userTemp = this.usersRepository.create({
        ...createUserDto,
        password_hash,
      });

      await this.usersRepository.save(userTemp);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: {email} });


      return user || null;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();

      return {
        countUsers: users.length,
        users,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userExists = await this.findOne(id);

      const updateUser = this.usersRepository.merge(userExists, updateUserDto);

      await this.usersRepository.save(updateUser);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async softDelete(id: string) {
    try {
      const user = await this.findOne(id);

      if (!user.isActive) {
        throw new HttpException('User is already desactivated', 400);
      }

      await this.usersRepository.update(id, {
        isActive: false,
      });

      const userUpdated = await this.findOne(id);

      return {
        status: 200,
        message: 'User desactivated with sucesss',
        data: {
          userUpdated,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async active(id: string) {
    try {
      const user = await this.findOne(id);

      if (user.isActive) {
        throw new HttpException('User is already active', 400);
      }

      await this.usersRepository.update(id, {
        isActive: true,
      });

      const userUpdated = await this.findOne(id);

      return {
        status: 200,
        message: 'User activated with sucess',
        data: {
          userUpdated,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async delete(id: string) {
    try {

      const user = await this.findOne(id);

      if(!user) {
        throw new HttpException('User not found', 404)
      }

      await this.usersRepository.delete(id)
      
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}
