import { InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { User, users } from '../users/user.schema';
import { PostImages } from './post-images.schema';

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
  createdBy: varchar('created_by')
    .references(() => users.id)
    .notNull(),
});

export interface Post
  extends Omit<InferSelectModel<typeof posts>, 'createdBy'> {
  createdBy: string | Omit<User, 'createdAt' | 'updatedAt'>;
  image: Pick<PostImages, 'id' | 'url'> | null;
}

export type NewPost = typeof posts.$inferInsert;
