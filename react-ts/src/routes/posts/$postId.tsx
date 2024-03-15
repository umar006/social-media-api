import { createFileRoute, notFound } from "@tanstack/react-router";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import { postDetailQueryOptions } from "../../components/Post/postDetailQueryOptions";
import postService from "../../services/post";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ context, params: { postId } }) => {
    postService.setBearerToken(context.accessToken);

    const post = await context.queryClient.ensureQueryData(
      postDetailQueryOptions(postId),
    );
    if (!post) throw notFound();

    return post;
  },
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <NotFound message="Post not found" />,
  errorComponent: () => {
    return (
      <>
        <Error>
          <div>Failed fetch post detail</div>
        </Error>
      </>
    );
  },
});
