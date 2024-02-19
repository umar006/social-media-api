import { User } from "./user";

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  isLiked: boolean;
  likes: number;
  createdBy: User;
}

export type NewPost = Pick<Post, "content">;
