import { User } from "./user";

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likes: number;
  createdBy: User;
}

export type NewPost = Pick<Post, "content">;
