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
  }, [post]);

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

  const postImage = () => {
    if (!post.image) return null;

    return <img src={post.image.url} />;
  };

  const btnLike = () => {
    const fill = isLiked ? "fill-red-600" : "fill-none";
    const stroke = isLiked
      ? "stroke-none"
      : "stroke-slate-600 hover:stroke-rose-600";
    const className = `${fill} ${stroke}`;

    return (
      <button onClick={() => mutationLikes.mutate(post.id)}>
        <svg
          className={className}
          width="24"
          height="21"
          viewBox="0 0 24 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 2.61C20.3292 2.099 19.7228 1.69364 19.0554 1.41708C18.3879 1.14052 17.6725 0.998173 16.95 0.998173C16.2275 0.998173 15.5121 1.14052 14.8446 1.41708C14.1772 1.69364 13.5708 2.099 13.06 2.61L12 3.67L10.94 2.61C9.9083 1.57831 8.50903 0.998708 7.05 0.998708C5.59096 0.998708 4.19169 1.57831 3.16 2.61C2.1283 3.64169 1.54871 5.04097 1.54871 6.5C1.54871 7.95903 2.1283 9.35831 3.16 10.39L4.22 11.45L12 19.23L19.78 11.45L20.84 10.39C21.351 9.87924 21.7563 9.27281 22.0329 8.60535C22.3095 7.93789 22.4518 7.22249 22.4518 6.5C22.4518 5.77751 22.3095 5.0621 22.0329 4.39464C21.7563 3.72718 21.351 3.12075 20.84 2.61V2.61Z"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  return (
    <article>
      <div className="text-lg font-semibold">{post.createdBy.displayName}</div>
      <div className="text-sm font-thin">@{post.createdBy.username}</div>

      <div className="my-4">
        <p>{post.content}</p>
        {postImage()}
      </div>

      <div className="my-2 flex items-center gap-2">
        <span className="text-lg font-medium">{likes}</span>

        {btnLike()}
      </div>

      <p>{dateToUTC}</p>
    </article>
  );
}

export default Post;
