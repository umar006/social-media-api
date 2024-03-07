import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { postListQueryOptions } from "../../components/PostList/postListQueryOptions";
import PostList from "../../components/PostList";

export const Route = createLazyFileRoute("/posts/")({
  component: PostListComponent,
});

function PostListComponent() {
  const postListQuery = useSuspenseQuery(postListQueryOptions);
  const posts = postListQuery.data;

  return <PostList posts={posts} />;
}
