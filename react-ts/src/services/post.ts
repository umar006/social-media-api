import axios from "axios";
import type { Post } from "../types/post";

const baseUrl = "http://localhost:3000/posts";

const getAllPosts = async () => {
  const { data } = await axios.get<Post[]>(baseUrl);
  return data;
};

export { getAllPosts };
