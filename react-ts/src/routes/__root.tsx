import { QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";
import postService from "../services/post";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  const token = window.localStorage.getItem("accessToken");
  postService.setBearerToken(token);

  const handleLogout = async () => {
    window.localStorage.removeItem("accessToken");
    postService.setBearerToken(null);

    await navigate({ to: "/" });
  };

  const loginOrLogout = () => {
    if (token) {
      console.log("HALO");
      return (
        <button type="button" onClick={() => void handleLogout()}>
          Logout
        </button>
      );
    }

    return <Link to="/login">Login</Link>;
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link> {loginOrLogout()}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
