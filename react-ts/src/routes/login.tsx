import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.accessToken) {
      throw redirect({ to: "/posts" });
    }
  },
});
