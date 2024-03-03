import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { posts } from './post.schema';

export const postImages = pgTable('post_images', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  url: varchar('url').notNull(),
  postId: varchar('post_id')
    .references(() => posts.id)
    .notNull(),
});

export type PostImages = typeof postImages.$inferSelect;
