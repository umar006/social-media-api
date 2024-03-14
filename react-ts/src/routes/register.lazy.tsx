import { createLazyFileRoute } from "@tanstack/react-router";
import RegisterForm from "../components/RegisterForm";

export const Route = createLazyFileRoute("/register")({
  component: () => {
    return (
      <>
        <h2 className="m-4 text-center text-3xl font-bold">Register</h2>
        <RegisterForm />
      </>
    );
  },
});
