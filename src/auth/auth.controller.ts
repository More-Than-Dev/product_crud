import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}
    
    @Post("login")
    userLogin(@Body() body:LoginDto) {
        return this.authService.UserLogin(body)
    }
}
