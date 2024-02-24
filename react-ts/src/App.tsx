import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import postService from "./services/post";

function App() {
  const [token, setToken] = useState<string | null>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    postService.setBearerToken(token);
    setToken(token);
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getAllPosts,
  });

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

  const logout = async () => {
    window.localStorage.removeItem("accessToken");
    postService.setBearerToken(null);
    setToken(null);
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const postForm = () => (
    <>
      <h2>Create post</h2>
      <PostForm />
    </>
  );

  return (
    <>
      {token && (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            void logout();
          }}
        >
          logout
        </a>
      )}
      {token ? postForm() : loginForm()}
      <h2>Posts</h2>
      <PostList posts={data} />
    </>
  );
}

export default App;
