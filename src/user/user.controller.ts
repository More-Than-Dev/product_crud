import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post("register")
    async userRegistration(@Body() body: RegisterUserDto) {
        return this.userService.AddUser(body.name, body.email, body.password)
    }
    @Post("update-user")
    userUpdation() {
        return this.userService.UpdateUser()
    }
    @Get("get-user-by-id/:id")
    @UseGuards(AuthGuard)
    async fetchUserById(@Param('id') id: string) {
        return this.userService.SelectUserById(id)
    }
    
}
