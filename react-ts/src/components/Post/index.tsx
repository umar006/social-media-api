import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import postService from "../../services/post";
import type { ErrorResponse } from "../../types/error";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  useEffect(() => {
    setIsLiked(post.isLiked);
  }, [post.isLiked]);

  const mutationLikes = useMutation({
    mutationFn: async (postId: string) => {
      if (isLiked) {
        await postService.decrementLikesByOne(postId);
        return;
      }

      await postService.incrementLikesByOne(postId);
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
    onError: (err) => {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        alert(err.response?.data.message);
      }
      console.log(err);
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
