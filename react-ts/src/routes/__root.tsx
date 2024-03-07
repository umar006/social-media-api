import { QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/">Home</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
