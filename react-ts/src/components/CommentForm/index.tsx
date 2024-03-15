import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Route as PostDetailRoute } from "../../routes/posts/$postId";
import postService from "../../services/post";
import { ErrorResponse } from "../../types/error";
import { NewComment } from "../../types/post";
import { commentListQueryOptions } from "../CommentList/commentListQueryOptions";

function CommentForm() {
  const queryClient = useQueryClient();
  const { postId } = PostDetailRoute.useParams();

  const mutation = useMutation({
    mutationFn: postService.createComment,
    onSuccess: async () =>
      await queryClient.invalidateQueries(commentListQueryOptions(postId)),
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(error.response?.data.message);
      }

      console.log(error);
    },
  });

  const form = useForm<NewComment>({
    defaultValues: {
      comment: "",
    },
    onSubmit: ({ value: comment, formApi }) => {
      mutation.mutate({ comment, postId });
      formApi.reset();
    },
  });

  return (
    <>
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="mx-auto flex max-w-xl flex-col border-2">
            <form.Field name="comment">
              {(field) => (
                <>
                  <textarea
                    className="w-full border-b-2 p-2 focus:outline-sky-300"
                    rows={4}
                    placeholder="Write a comment..."
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></textarea>
                  <div className="text-sm text-red-600">
                    {field.state.meta.errors.join(",")}
                  </div>
                </>
              )}
            </form.Field>

            <button
              type="submit"
              className="m-2 bg-sky-600 px-4 py-2 text-white"
            >
              Comment
            </button>
          </div>
        </form>
      </form.Provider>
    </>
  );
}

export default CommentForm;
