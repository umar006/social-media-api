import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from '../users/user.schema';

export const posts = pgTable('posts', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  content: text('content').notNull(),
  likes: integer('likes').default(0).notNull(),
  createdBy: integer('created_by')
    .references(() => users.id)
    .notNull(),
});
