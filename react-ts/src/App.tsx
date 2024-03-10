import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Route } from "./routes/__root";
import postService from "./services/post";

function App() {
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

  const register = () => {
    if (context.accessToken) {
      return null;
    }

    return <Link to="/register">Register</Link>;
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/posts">Posts</Link>{" "}
        {loginOrLogout()} {register()}
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
