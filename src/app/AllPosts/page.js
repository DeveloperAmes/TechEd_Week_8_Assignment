import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function AllPostsPage() {
  const { rows } = await db.query(`SELECT * FROM facts_posts`);
  return (
    <section>
      <h1>All Posts</h1>
      {rows.map((post) => {
        return (
          <ul key={post.id}>
            <li>
              {post.title}
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
