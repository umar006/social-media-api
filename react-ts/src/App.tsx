import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "./services/post";
import PostList from "./components/PostList";

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Erro: {error.message}</span>;
  }

  return (
    <>
      <h2>Posts</h2>
      <PostList posts={data} />
    </>
  );
}

export default App;
