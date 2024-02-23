import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { getAllPosts } from "./services/post";

function App() {
  const [token, setToken] = useState<string>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      setToken(token);
    }
  }, []);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <LoginForm setToken={setToken} />
    </>
  );

  const postForm = () => (
    <>
      <h2>Create post</h2>
      <PostForm />
    </>
  );

  return (
    <>
      {token ? postForm() : loginForm()}
      <h2>Posts</h2>
      <PostList posts={data} />
    </>
  );
}

export default App;
