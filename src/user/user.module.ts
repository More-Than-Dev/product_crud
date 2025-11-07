import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/db/database.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard,AuthService],
  exports:[UserService]
})
export class UserModule {}
