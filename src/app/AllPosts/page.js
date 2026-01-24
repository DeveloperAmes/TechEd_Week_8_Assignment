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
    <section className="">
      <Link href={"/"}>Go back to home</Link>
      <h3>All Posts</h3>
      <p>Sort By:</p>
      <ul>
        <li>
          <Link href={"/AllPosts?sort=asc"}>Title A-Z</Link>
        </li>
        <li>
          <Link href={"/AllPosts?sort=desc"}>Title Z-A</Link>
        </li>
      </ul>
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
