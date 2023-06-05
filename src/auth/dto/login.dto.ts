export class LoginDto {
    email: string;
    password: string;
}

export class LoginResponseDto {
    success: boolean;
    data: {
        id: string;
        email: string;
    }

}


