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

export default App;
