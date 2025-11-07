// user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}


export class UpdateUserDto {
    @IsNotEmpty({ message: "User id required" })
    id: string;
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
}

export class LoginDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}