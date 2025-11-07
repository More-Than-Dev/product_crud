import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async checkConnection() {
    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT NOW()');
      client.release();
      this.logger.log(`✅ Database connected: ${result.rows[0].now}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }
}
