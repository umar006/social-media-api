import { queryOptions } from "@tanstack/react-query";
import postService from "../../services/post";

export const postDetailQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["posts", "detail", postId],
    queryFn: async () => await postService.getOnePostById(postId),
  });
