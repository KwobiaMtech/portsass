import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserResponseDto } from '../dto/registerUserResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUser: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const user = new UserEntity();
    if (createUser.firstName) user.firstName = createUser.firstName;
    if (createUser.lastName) user.lastName = createUser.lastName;
    user.email = createUser.email;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUser.password, salt);
    user.password = hashedPassword;
    const savedUser = await this.usersRepository.save(user);
    return {
      success: true,
      data: savedUser,
    };
  }
}
