import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    if (context.accessToken) {
      throw redirect({ to: "/posts" });
    }
  },
});
