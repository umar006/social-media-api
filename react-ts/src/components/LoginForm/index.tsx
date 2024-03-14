import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { login } from "../../services/auth";
import type { LoginDto } from "../../types/auth";
import type { ErrorResponse } from "../../types/error";

function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<LoginDto>({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { accessToken } = await login(value);

        window.localStorage.setItem("accessToken", accessToken);

        await navigate({ to: "/posts" });
      } catch (e) {
        if (axios.isAxiosError<ErrorResponse>(e)) {
          alert(e.response?.data.message);
        }
        console.log(e);
      }
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
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <div>
              <form.Field
                name="username"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length <= 0) return "username cannot be empty";

                    return null;
                  },
                }}
                children={(field) => (
                  <>
                    <input
                      className="border-2 border-slate-300 p-2 focus:outline-sky-600"
                      placeholder="username"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <div className="text-sm text-red-600">
                      {field.state.meta.errors.join(",")}
                    </div>
                  </>
                )}
              />
            </div>

            <div>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length <= 0) return "password cannot be empty";

                    return null;
                  },
                }}
                children={(field) => (
                  <>
                    <input
                      className="border-2 border-slate-300 p-2 focus:outline-sky-600"
                      placeholder="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <div className="text-sm text-red-600">
                      {field.state.meta.errors.join(",")}
                    </div>
                  </>
                )}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-sky-600 px-4 py-2 text-white"
            >
              login
            </button>
          </div>
        </form>
      </form.Provider>
    </>
  );
}

export default LoginForm;
