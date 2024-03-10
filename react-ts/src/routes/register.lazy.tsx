import { createLazyFileRoute } from "@tanstack/react-router";
import RegisterForm from "../components/RegisterForm";

export const Route = createLazyFileRoute("/register")({
  component: RegisterForm,
});
