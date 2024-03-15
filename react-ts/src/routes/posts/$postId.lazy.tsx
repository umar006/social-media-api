import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import Post from "../../components/Post";
import { postDetailQueryOptions } from "../../components/Post/postDetailQueryOptions";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: PostDetail,
});

function PostDetail() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postDetailQueryOptions(postId));

  return (
    <div className="mx-auto mt-8 max-w-2xl border-2 border-sky-300 bg-sky-50 p-4">
      <Post post={post} />
    </div>
  );
}
