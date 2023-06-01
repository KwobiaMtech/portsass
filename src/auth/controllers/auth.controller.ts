import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { RegisterUserResponseDto } from '../dto/registerUserResponse.dto';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  async createUser(@Body()  request: RegisterUserDto): Promise<RegisterUserResponseDto> {
    return await this.authService.createUser(request);
  }
}
