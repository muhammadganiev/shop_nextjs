import getPosts from "@/server/actions/get-posts";
import Image from "next/image";

export default async function Home() {
  const data = await getPosts()
  console.log(data)
  return (
    <main>
      <h1>Wellcome to next js</h1>
    </main>
  );
}
