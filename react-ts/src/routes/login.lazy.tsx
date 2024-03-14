import { createLazyFileRoute } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";

export const Route = createLazyFileRoute("/login")({
  component: () => {
    return (
      <>
        <h2 className="m-4 text-center text-3xl font-bold">Login</h2>
        <LoginForm />
      </>
    );
  },
});
