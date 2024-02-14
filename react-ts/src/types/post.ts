export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likes: number;
  createdBy: number;
}

export type NewPost = Pick<Post, "content">;
