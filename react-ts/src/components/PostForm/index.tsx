import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../../services/post";
import { NewPost } from "../../types/post";

function PostForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    <div>
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div>
            <form.Field name="content">
              {(field) => {
                return (
                  <>
                    <textarea
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></textarea>
                    {formError.length > 0 ? (
                      <em>{formError.join(", ")}</em>
                    ) : null}
                  </>
                );
              }}
            </form.Field>
            <form.Field name="file">
              {(field) => {
                return (
                  <input
                    type="file"
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
          </div>
          <button type="submit">Add</button>
        </form>
      </form.Provider>
    </div>
  );
}

export default PostForm;
