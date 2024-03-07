import { createFileRoute } from "@tanstack/react-router";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";
import postService from "../../services/post";

export const Route = createFileRoute("/posts/")({
  loader: async ({ context }) => {
    postService.setBearerToken(context.accessToken);
    return await context.queryClient.ensureQueryData(postListQueryOptions);
  },
});
