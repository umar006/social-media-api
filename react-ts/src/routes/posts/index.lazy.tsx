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
      <>
        <h2> Create new post</h2>
        <PostForm />
      </>
    );
  };

  return (
    <>
      {postForm()}
      <h2>Post List</h2>
      <PostList posts={data} />
    </>
  );
}
