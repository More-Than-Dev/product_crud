import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if(!token) throw new BadRequestException('No Token Found')
      const tokenData = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      const { userId, authId } = tokenData;
      const result = await this.authService.validateAccess({
        loginId: authId,
        userId: userId,
      });
    return result;

    } catch (error) {
      console.error('auth error - ', error.message);
       if (error instanceof BadRequestException) {
        throw error;
      }
        
      return false;
    }
  }
}
