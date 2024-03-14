import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import Error from "../../components/Error";
import postService from "../../services/post";
import NotFound from "../../components/NotFound";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ context, params: { postId } }) => {
    postService.setBearerToken(context.accessToken);

    const postDetailQueryOptions = queryOptions({
      queryKey: ["posts", "detail", postId],
      queryFn: async () => await postService.getOnePostById(postId),
    });

    const post = await context.queryClient.ensureQueryData(
      postDetailQueryOptions,
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
