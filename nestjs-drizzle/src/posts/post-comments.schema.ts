import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { User, users } from 'src/users/user.schema';
import { posts } from './post.schema';

export const postComments = pgTable('post_comments', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  comment: varchar('comment').notNull(),
  postId: varchar('post_id')
    .references(() => posts.id)
    .notNull(),
  createdBy: varchar('createdBy')
    .references(() => users.id)
    .notNull(),
});

export interface PostComment
  extends Omit<typeof postComments.$inferSelect, 'postId' | 'createdBy'> {
  createdBy: string | Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
}
