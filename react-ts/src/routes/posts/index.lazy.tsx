import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import PostForm from "../../components/PostForm";
import PostList from "../../components/PostList";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";

export const Route = createLazyFileRoute("/posts/")({
  component: PostListComponent,
});

function PostListComponent() {
  const { data, error, isPending, isError } =
    useSuspenseQuery(postListQueryOptions);
  const context = Route.useRouteContext();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <span>
        Error:{" "}
        {error ? error.message : "unidentified error in post list component"}
      </span>
    );
  }

  const postForm = () => {
    if (!context.accessToken) return null;

    return (
      <div className="m-4">
        <h2 className="my-4 text-3xl font-bold">Write new post</h2>
        <PostForm />
      </div>
    );
  };

  return (
    <>
      {postForm()}
      <h2 className="m-4 text-3xl font-bold">Post List</h2>
      <PostList posts={data} />
    </>
  );
}
