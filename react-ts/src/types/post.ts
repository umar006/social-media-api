import { User } from "./user";

interface PostImage {
  id: string;
  url: string;
}

export interface PostComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  createdBy: User;
}

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  isLiked: boolean;
  likes: number;
  createdBy: User;
  image?: PostImage;
}

export interface NewPost extends Pick<Post, "content"> {
  file?: File;
}
