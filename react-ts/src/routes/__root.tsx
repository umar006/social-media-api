import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "../App";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  beforeLoad: ({ location }) => {
    return {
      location,
      accessToken: window.localStorage.getItem("accessToken"),
    };
  },
  component: App,
});
