import axios from "axios";
import type { NewPost, Post } from "../types/post";

const baseUrl = "http://localhost:3000/posts";

let token: string | null = null;

const setBearerToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAllPosts = async () => {
  const { data } = await axios.get<Post[]>(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const createPost = async (body: NewPost) => {
  await axios.post(baseUrl, body, {
    headers: {
      Authorization: token,
    },
  });
};

const incrementLikesByOne = async (postId: string) => {
  await axios.put(`${baseUrl}/${postId}/likes/increment`, {
    headers: {
      Authorization: token,
    },
  });
};

const decrementLikesByOne = async (postId: string) => {
  await axios.put(`${baseUrl}/${postId}/likes/decrement`, {
    headers: {
      Authorization: token,
    },
  });
};

export default {
  createPost,
  decrementLikesByOne,
  getAllPosts,
  incrementLikesByOne,
  setBearerToken,
};
