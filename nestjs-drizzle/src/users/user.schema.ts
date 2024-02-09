import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  username: varchar('username').notNull(),
  displayName: varchar('display_name').notNull(),
  password: varchar('password').notNull(),
});

export type User = Omit<typeof users.$inferSelect, 'password'>;
