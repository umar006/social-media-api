import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from 'src/users/user.schema';
import { posts } from './post.schema';

export const postLikes = pgTable('post_likes', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  postId: varchar('post_id')
    .references(() => posts.id)
    .notNull(),
  userId: varchar('user_id')
    .references(() => users.id)
    .notNull(),
});
