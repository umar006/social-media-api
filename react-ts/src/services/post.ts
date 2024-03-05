import axios from "axios";
import type { NewPost, Post } from "../types/post";

const host = import.meta.env.VITE_PSM_HOST;
const port = import.meta.env.VITE_PSM_PORT;
const baseUrl = `${host}:${port}/api/posts`;

let token: string | null = null;

const setBearerToken = (newToken: string | null) => {
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
  await axios.postForm(baseUrl, body, {
    headers: {
      Authorization: token,
    },
  });
};

const incrementLikesByOne = async (postId: string) => {
  await axios.put(`${baseUrl}/${postId}/likes/increment`, null, {
    headers: {
      Authorization: token,
    },
  });
};

const decrementLikesByOne = async (postId: string) => {
  await axios.put(`${baseUrl}/${postId}/likes/decrement`, null, {
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
