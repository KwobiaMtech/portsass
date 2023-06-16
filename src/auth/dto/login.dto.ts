import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LoginResponseDto {
    @IsBoolean()
    success: boolean;
    
    data: {
        id: string;
        email: string;
    }

}


