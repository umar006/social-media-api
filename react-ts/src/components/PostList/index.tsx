import type { Post as PostType } from "../../types/post";
import Post from "../Post";

interface Props {
  posts: PostType[];
}

function PostList({ posts }: Props) {
  const postList = posts.map((post) => {
    return (
      <li key={post.id}>
        <Post post={post} />
      </li>
    );
  });

  return <ul>{postList}</ul>;
}

export default PostList;
