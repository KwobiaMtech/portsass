import { IsBoolean, IsObject } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class RegisterUserResponseDto {
  @IsBoolean()
  success: boolean;

  data: UserEntity;
}
