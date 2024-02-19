import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { incrementLikes } from "../../services/post";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [likes, setLikes] = useState(post.likes);

  const mutationLikes = useMutation({
    mutationFn: incrementLikes,
    onSuccess: () => {
      setLikes((prevLikes) => prevLikes + 1);
    },
  });

  const dateToUTC = new Date(post.createdAt).toUTCString();

  return (
    <article>
      <span>{post.createdBy.username}</span>
      <p>{post.content}</p>

      <span>{likes}</span>
      <button onClick={() => mutationLikes.mutate(post.id)}>likes</button>

      <p>{dateToUTC}</p>
    </article>
  );
}

export default Post;
