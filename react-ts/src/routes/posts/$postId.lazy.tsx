import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import Post from "../../components/Post";
import { postDetailQueryOptions } from "../../components/Post/postDetailQueryOptions";
import postService from "../../services/post";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: PostDetail,
});

function PostDetail() {
  const { postId } = Route.useParams();
  const context = Route.useRouteContext();
  const { data: post } = useSuspenseQuery(postDetailQueryOptions(postId));
  const { data: comments } = useSuspenseQuery({
    queryKey: ["posts", "detail", postId, "comments"],
    queryFn: async () => await postService.getAllCommentsByPostId(postId),
  });

  const commentForm = () => {
    if (!context.accessToken) return null;

    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="my-4 text-left text-2xl font-bold">Write a comment</h2>
        <CommentForm />
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto mt-8 max-w-2xl border-2 border-sky-300 bg-sky-50 p-4">
        <Post post={post} />
      </div>

      <hr className="mx-auto mt-4 h-1 w-1/2 border-none bg-sky-600" />

      {commentForm()}

      <div className="mx-auto max-w-2xl">
        <h2 className="my-8 text-2xl font-bold">Comments</h2>
        <CommentList comments={comments} />
      </div>
    </>
  );
}
