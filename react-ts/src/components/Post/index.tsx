import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const dateToUTC = new Date(post.createdAt).toUTCString();

  return (
    <article>
      <span>{post.createdBy.username}</span>
      <p>{post.content}</p>
      <span>{post.likes}</span>
      <p>{dateToUTC}</p>
    </article>
  );
}

export default Post;
