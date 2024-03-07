import { queryOptions } from "@tanstack/react-query";
import postService from "../../services/post";

export const postListQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: postService.getAllPosts,
});
