import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";
import PostList from "../../components/PostList";

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

  return <PostList posts={data} />;
}
