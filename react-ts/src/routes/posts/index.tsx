import { createFileRoute } from "@tanstack/react-router";
import ErrorComponent from "../../components/Error";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";
import postService from "../../services/post";

export const Route = createFileRoute("/posts/")({
  loader: async ({ context }) => {
    postService.setBearerToken(context.accessToken);
    return await context.queryClient.ensureQueryData(postListQueryOptions);
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => {
    return (
      <ErrorComponent>
        <div>Failed to fetch posts</div>
      </ErrorComponent>
    );
  },
});
