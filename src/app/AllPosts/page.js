import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";

export default async function AllPostsPage({ searchParams }) {
  const { rows } = await db.query(`SELECT * FROM facts_posts`);
  const queryString = await searchParams;
  if (queryString.sort === "asc") {
    rows.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } else if (queryString.sort === "desc") {
    rows.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }
  return (
    <section>
      <Link href={"/"}>Go back to home</Link>
      <h2>All Posts</h2>
      <Link href={"/AllPosts?sort=asc"}>ASC</Link>
      <Link href={"/AllPosts?sort=desc"}>DESC</Link>
      {rows.map((post) => {
        return (
          <ul key={post.id}>
            <li>
              <Link href={`/AllPosts/${post.id}`}>{post.title}</Link>
              <Image
                src={post.img_url}
                width="200"
                height="150"
                alt={post.img_alt}
              />
            </li>
          </ul>
        );
      })}
    </section>
  );
}
