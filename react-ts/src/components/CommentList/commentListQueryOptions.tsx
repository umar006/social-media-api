import { queryOptions } from "@tanstack/react-query";
import postService from "../../services/post";

export const commentListQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["posts", "detail", postId, "comments"],
    queryFn: async () => await postService.getAllCommentsByPostId(postId),
  });
