import { useForm } from "@tanstack/react-form";
import { createPost } from "../../services/post";

function PostForm() {
  const form = useForm({
    defaultValues: {
      content: "",
    },
    onSubmit: async ({ value }) => {
      await createPost(value);
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
          </div>
          <button type="submit">Add</button>
        </form>
      </form.Provider>
    </div>
  );
}

export default PostForm;
