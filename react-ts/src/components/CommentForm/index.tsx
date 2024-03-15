import { useForm } from "@tanstack/react-form";
import { NewComment } from "../../types/post";

function CommentForm() {
  const form = useForm<NewComment>({
    defaultValues: {
      comment: "",
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
