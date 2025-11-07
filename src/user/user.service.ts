import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('DB') private db: NodePgDatabase) {}

  async AddUser(name: string, email: string, password: string) {
    const hashPassword = bcrypt.hashSync(password, 10);
    await this.db.insert(users).values({ name, email, password: hashPassword });
    return { message: 'User created successfully' };
  }
  UpdateUser() {
    return true;
  }
  async SelectUserById(id: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));
    return result[0];
  }

  
  async ValidateUser(email: string) {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email));

      const user = result[0];

      if (!user) {
        throw new BadRequestException('Invalid email or password!!');
      }
      return user;
    } catch (error) {
      console.error('Error in validate user', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something went wrong validating user',
      );
    }
  }
}
