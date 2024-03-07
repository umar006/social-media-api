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
  beforeLoad: () => {
    return {
      accessToken: window.localStorage.getItem("accessToken"),
    };
  },
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const context = Route.useRouteContext();

  const handleLogout = async () => {
    window.localStorage.removeItem("accessToken");
    postService.setBearerToken(null);

    await navigate({ to: "/" });
  };

  const loginOrLogout = () => {
    if (context.accessToken) {
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
