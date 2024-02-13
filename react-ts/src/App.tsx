import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likes: number;
  createdBy: number;
}

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<Post[]>("http://localhost:3000/posts");
      return data;
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Erro: {error.message}</span>;
  }

  const postList = data.map((post) => {
    const dateToUTC = new Date(post.createdAt).toUTCString();

    return (
      <li key={post.id}>
        <article>
          <span>{post.createdBy}</span>
          <p>{post.content}</p>
          <span>{post.likes}</span>
          <p>{dateToUTC}</p>
        </article>
      </li>
    );
  });

  return (
    <>
      <h2>Posts</h2>
      <ul>{postList}</ul>
    </>
  );
}

export default App;
