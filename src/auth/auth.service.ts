import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TLoginType } from 'src/type/user';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { login } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('DB') private db: NodePgDatabase,
  ) {}

  async UserLogin(input: TLoginType) {
    try {
      const { password, email } = input;

      const user = await this.userService.ValidateUser(email);

      if (!user) {
        throw new BadRequestException('Invalid email or password!!');
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password');
      }
     const returnData =  await this.db.insert(login).values({ user_id: user.id }).returning();
      const payload = { userId: user.id, username: user.email, authId:returnData[0].login_id };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: '1h',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: '7d',
      });

      
      return {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    } catch (error) {
      console.error('Error in user login', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Something went wrong during login',
      );
    }
  }

  async validateAccess(input:{loginId:number,userId:number}):Promise<boolean> {
    const data = await this.db.select().from(login).where(eq(login.login_id,input.loginId))
    if(data[0].user_id === input.userId)
      return true;
    return false;
  } 
}
