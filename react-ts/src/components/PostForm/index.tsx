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
            <form.Field
              name="content"
              validators={{
                onChange: ({ value }) => {
                  return value.length <= 0
                    ? "Content cannot be empty"
                    : undefined;
                },
              }}
            >
              {(field) => {
                return (
                  <>
                    <textarea
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></textarea>
                    {field.state.meta.errors.length > 0 ? (
                      <em>{field.state.meta.errors.join(", ")}</em>
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
