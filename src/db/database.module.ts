import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // we'll define tables here soon

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',        
  password: 'P@ssw0rd', 
  database: 'product_crud',    
  ssl: {
    rejectUnauthorized: false, // ✅ ignore self-signed cert
  },    
});

const db = drizzle(pool, { schema });

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useValue: db,
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
