import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { register } from "../../services/auth";
import type { RegisterDto } from "../../types/auth";
import type { ErrorResponse } from "../../types/error";

function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<RegisterDto>({
    defaultValues: {
      username: "",
      displayName: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { accessToken } = await register(value);

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
          <div>
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) => {
                  if (value.length <= 0) return "username is required";

                  return null;
                },
              }}
              children={(field) => (
                <>
                  <input
                    placeholder="username"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span>{field.state.meta.errors.join(",")}</span>
                </>
              )}
            ></form.Field>
          </div>
          <div>
            <form.Field
              name="displayName"
              validators={{
                onChange: ({ value }) => {
                  if (value.length <= 0) return "display name is required";

                  return null;
                },
              }}
              children={(field) => (
                <>
                  <input
                    placeholder="display name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span>{field.state.meta.errors.join(",")}</span>
                </>
              )}
            ></form.Field>
          </div>
          <div>
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (value.length <= 0) return "password is required";

                  return null;
                },
              }}
              children={(field) => (
                <>
                  <input
                    placeholder="password"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span>{field.state.meta.errors.join(",")}</span>
                </>
              )}
            ></form.Field>
          </div>

          <button type="submit">register</button>
        </form>
      </form.Provider>
    </>
  );
}

export default RegisterForm;
