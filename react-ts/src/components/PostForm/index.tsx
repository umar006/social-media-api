import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import postService from "../../services/post";
import type { ErrorResponse } from "../../types/error";
import type { NewPost } from "../../types/post";

function PostForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(error.response?.data.message);
      }
      console.log(error);
    },
  });

  const form = useForm<NewPost>({
    defaultValues: {
      content: "",
      file: undefined,
    },
    onSubmit: ({ value, formApi }) => {
      mutation.mutate(value);
      formApi.reset();
    },
    validators: {
      onChange: ({ value }) => {
        return value.content.length <= 0
          ? "Content cannot be empty"
          : undefined;
      },
    },
  });

  const formError = form.useStore((state) => {
    return state.errors;
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
          <div className="flex max-w-xl flex-col border-2">
            <form.Field name="content">
              {(field) => {
                return (
                  <>
                    <textarea
                      className="w-full border-b-2 p-2 focus:outline-sky-300"
                      rows={4}
                      placeholder="Write a post..."
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></textarea>
                    {formError.length > 0 ? (
                      <em className="m-2 text-red-600">
                        {formError.join(", ")}
                      </em>
                    ) : null}
                  </>
                );
              }}
            </form.Field>

            <div className="flex flex-row items-center justify-between p-2">
              <form.Field name="file">
                {(field) => {
                  return (
                    <input
                      type="file"
                      accept="image/*"
                      name={field.name}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.files ? e.target.files[0] : undefined,
                        )
                      }
                    />
                  );
                }}
              </form.Field>

              <button type="submit" className="bg-sky-600 px-4 py-2 text-white">
                Add
              </button>
            </div>
          </div>
        </form>
      </form.Provider>
    </>
  );
}

export default PostForm;
