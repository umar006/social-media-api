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
              children={(field) => {
                return (
                  <textarea
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></textarea>
                );
              }}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </form.Provider>
    </div>
  );
}

export default PostForm;
