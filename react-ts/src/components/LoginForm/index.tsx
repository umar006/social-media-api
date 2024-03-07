import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { login } from "../../services/auth";
import postService from "../../services/post";
import type { LoginDto } from "../../types/auth";
import type { ErrorResponse } from "../../types/error";

interface Props {
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

function LoginForm({ setToken }: Props) {
  const queryClient = useQueryClient();
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
        // setToken(accessToken);
        postService.setBearerToken(accessToken);
        await queryClient.invalidateQueries({ queryKey: ["posts"] });

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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span>{field.state.meta.errors.join(",")}</span>
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
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span>{field.state.meta.errors.join(",")}</span>
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
