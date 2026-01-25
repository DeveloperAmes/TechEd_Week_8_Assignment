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
      <Link href={"/"} className="border-2 p-2">
        Go back to home
      </Link>
      <h3 className="text-xl m-2 text-center">All Posts</h3>
      <p>Sort By:</p>
      <ul className="flex justify-around">
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
            <li className="bg-black text-white p-2 flex mb-3">
              <Link href={`/AllPosts/${post.id}`} className="mr-2">
                {post.title}
              </Link>
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
