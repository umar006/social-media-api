import type { PostComment } from "../../types/post";

interface Props {
  comments: PostComment[];
}

function CommentList({ comments }: Props) {
  const commentList = comments.map((comment) => {
    const dateToUTC = new Date(comment.createdAt).toUTCString();

    return (
      <div
        key={comment.id}
        className="my-4 border-2 border-sky-300 bg-sky-50 p-4"
      >
        <div className="text-lg font-semibold">
          {comment.createdBy.displayName}
        </div>
        <div className="text-sm font-thin">@{comment.createdBy.username}</div>

        <div className="my-4">
          <p>{comment.comment}</p>
        </div>

        <p>{dateToUTC}</p>
      </div>
    );
  });

  return <>{commentList}</>;
}

export default CommentList;
