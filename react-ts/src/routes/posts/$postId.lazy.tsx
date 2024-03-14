import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import postService from "../../services/post";
import Post from "../../components/Post";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: PostDetail,
});

function PostDetail() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["posts", "detail", postId],
    queryFn: async () => await postService.getOnePostById(postId),
  });

  return (
    <div className="mx-auto mt-8 max-w-2xl border-2 border-sky-300 bg-sky-50 p-4">
      <Post post={post} />
    </div>
  );
}
