import { useForm } from "@tanstack/react-form";
import { login } from "../../services/auth";
import type { LoginDto } from "../../types/auth";

function LoginForm() {
  const form = useForm<LoginDto>({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login(value);
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
          <div>
            <form.Field
              name="username"
              children={(field) => (
                <>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </form.Provider>
    </>
  );
}

export default LoginForm;
