import type { Post } from "../../types/post";

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {
  const postList = posts.map((post) => {
    const dateToUTC = new Date(post.createdAt).toUTCString();

    return (
      <li key={post.id}>
        <article>
          <span>{post.createdBy}</span>
          <p>{post.content}</p>
          <span>{post.likes}</span>
          <p>{dateToUTC}</p>
        </article>
      </li>
    );
  });

  return <ul>{postList}</ul>;
}

export default PostList;
