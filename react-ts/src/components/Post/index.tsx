import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { incrementLikes } from "../../services/post";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const mutationLikes = useMutation({
    mutationFn: async () => {
      if (!isLiked) await incrementLikes(post.id);
    },
    onSuccess: () => {
      setLikes((prevLikes) => prevLikes + 1);
      setIsLiked((prevIsLiked) => !prevIsLiked);
    },
  });

  const dateToUTC = new Date(post.createdAt).toUTCString();

  return (
    <article>
      <span>{post.createdBy.username}</span>
      <p>{post.content}</p>

      <span>{likes}</span>
      <button onClick={() => mutationLikes.mutate()}>
        {isLiked ? "unlike" : "like"}
      </button>

      <p>{dateToUTC}</p>
    </article>
  );
}

export default Post;
