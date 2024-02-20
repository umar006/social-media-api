import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('users', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  username: varchar('username').unique().notNull(),
  displayName: varchar('display_name').notNull(),
  password: varchar('password').notNull(),
});

export type User = Omit<typeof users.$inferSelect, 'password'>;
export type UserWithPassword = typeof users.$inferSelect;
