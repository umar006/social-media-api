import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { decrementLikesByOne, incrementLikesByOne } from "../../services/post";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const mutationLikes = useMutation({
    mutationFn: async (postId: string) => {
      if (isLiked) {
        await decrementLikesByOne(postId);
        return;
      }

      await incrementLikesByOne(postId);
    },
    onSuccess: () => {
      if (isLiked) {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked((prevIsLiked) => !prevIsLiked);
        return;
      }

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
      <button onClick={() => mutationLikes.mutate(post.id)}>
        {isLiked ? "unlike" : "like"}
      </button>

      <p>{dateToUTC}</p>
    </article>
  );
}

export default Post;
