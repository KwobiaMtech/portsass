import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { RegisterUserResponseDto } from '../dto/registerUserResponse.dto';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  async createUser(
    @Body() request: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    return await this.authService.createUser(request);
  }

  @Post('login')
  async loginUser(
    @Body() request: LoginDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.loginEmailPassword(request);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.authService.getUser(id);
  }

  @Patch('user/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body()request: RegisterUserDto): Promise<UserEntity> {
    return await this.authService.getUser(id);
  }


  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    return await this.authService.getAllUsers();
  }

  @Delete('user/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.authService.deleteUser(id);
  }

}
