import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserResponseDto } from '../dto/registerUserResponse.dto';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { isUUID } from 'class-validator';

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
    await this.checkIfEmailExists(createUser.email);
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

  async loginEmailPassword(login: LoginDto): Promise<LoginResponseDto>{
    const user = await this.usersRepository.findOne({ where: { email: login.email } });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const isMatch = await bcrypt.compare(login.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', 400);
    }

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
      }
    }

  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }
    return false;
  }

  async getUser(id: string): Promise<UserEntity> {
    this.validateId(id);
    const user: UserEntity =  await this.usersRepository.findOne({where: {id}});
    if(!user){
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async updateUser(id: string, request: RegisterUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({where: {id}});
    if(!user){
      throw new HttpException('User not found', 404);
    }
    if(request.firstName) user.firstName = request.firstName;
    if(request.lastName) user.lastName = request.lastName;
    if(request.email) user.email = request.email;
    return await this.usersRepository.save(user)
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({where: {id}});
    if(!user){
      throw new HttpException('User not found', 404);
    }
    await this.usersRepository.delete(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  validateId(id: string): void{
    if(!isUUID(id)){
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
  }
}
