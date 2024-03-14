import { Link } from "@tanstack/react-router";
import type { Post as PostType } from "../../types/post";
import Post from "../Post";

interface Props {
  posts: PostType[];
}

function PostList({ posts }: Props) {
  const postList = posts.map((post) => {
    return (
      <li key={post.id}>
        <div className="m-4 max-w-2xl border-2 border-sky-300 bg-sky-50 p-4">
          <Link from="/posts" to="/posts/$postId" params={{ postId: post.id }}>
            <Post post={post} />
          </Link>
        </div>
      </li>
    );
  });

  return <ul>{postList}</ul>;
}

export default PostList;
