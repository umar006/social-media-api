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
    window.location.reload();
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
  console.log(context.location);

  const navActive = (path: string) => {
    return context.location.pathname === path
      ? "p-2 bg-white text-sky-600"
      : "p-2 hover:bg-white hover:text-sky-600";
  };

  return (
    <>
      <div className="flex justify-center gap-2 bg-sky-600 p-2 text-white">
        <div className={navActive("/")}>
          <Link to="/">Home</Link>
        </div>
        <div className={navActive("/posts")}>
          <Link to="/posts">Posts</Link>
        </div>
        <div className={navActive("/login")}>{loginOrLogout()}</div>
        <div className={navActive("/register")}>{register()}</div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
