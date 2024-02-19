import axios from "axios";
import type { NewPost, Post } from "../types/post";

const baseUrl = "http://localhost:3000/posts";

const getAllPosts = async () => {
  const { data } = await axios.get<Post[]>(baseUrl);
  return data;
};

const createPost = async (body: NewPost) => {
  await axios.post(baseUrl, body);
};

const incrementLikes = async (postId: string) => {
  await axios.put(`${baseUrl}/${postId}/likes/increment`);
};

export { createPost, getAllPosts, incrementLikes };
