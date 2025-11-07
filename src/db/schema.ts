import { integer } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  token:text('token'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const category = pgTable('category', {
  category_id: serial('category_id').primaryKey(),
  category_name: varchar('category_name', { length: 30 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const product = pgTable('product', {
  product_id: serial('product_id').primaryKey(),
  product_name: varchar('product_name', { length: 30 }).notNull(),
  price: integer().notNull(),
  category_id: integer('category_id')
    .references(() => category.category_id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const login = pgTable('login', {
  login_id: serial('login_id').primaryKey(),
  user_id: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
