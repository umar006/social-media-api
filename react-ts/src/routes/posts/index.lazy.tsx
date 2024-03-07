import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import PostList from "../../components/PostList";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";

export const Route = createLazyFileRoute("/posts/")({
  component: PostListComponent,
});

function PostListComponent() {
  const { data, error, isPending, isError } =
    useSuspenseQuery(postListQueryOptions);

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

  return (
    <>
      <h2>Post List</h2>
      <PostList posts={data} />
    </>
  );
}
