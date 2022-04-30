import useSWR from "swr";
import Layout from "../components/Layout";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = "https://jsonplaceholder.typicode.com/users";
export default function Example({ data }) {
  const { data: users, mutate } = useSWR("api/hello", fetcher, {
    fallbackData: data,
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout>
      {users &&
        users.map((user) => (
          <p key={user.id}>
            {user.name}: {user.email}
          </p>
        ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://localhost:3000/api/hello");
  const data = await res.json();
  return {
    props: { data },
    revalidate: 5,
  };
}
