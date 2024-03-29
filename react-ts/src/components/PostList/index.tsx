import type { Post as PostType } from "../../types/post";
import Post from "../Post";

interface Props {
  posts: PostType[];
}

function PostList({ posts }: Props) {
  const postList = posts.map((post) => {
    return (
      <div
        key={post.id}
        className="m-4 max-w-2xl border-2 border-sky-300 bg-sky-50 p-4"
      >
        <Post post={post} />
      </div>
    );
  });

  return <ul>{postList}</ul>;
}

export default PostList;
