import { createFileRoute } from "@tanstack/react-router";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";

export const Route = createFileRoute("/posts/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(postListQueryOptions);
  },
});
