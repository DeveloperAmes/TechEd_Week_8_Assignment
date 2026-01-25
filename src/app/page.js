import Image from "next/image";
import Link from "next/link";
import { db } from "@/utils/dbConnection";

export default async function HomePage() {
  const { rows } = await db.query(`SELECT * FROM facts_posts LIMIT 3`);
  return (
    <main>
      <section className="hero-image mt-6 mb-6">
        <Image
          src="/assets/chatgtpwomendata.png"
          alt="Representation of research on women having incomplete data compared to men."
          width={600}
          height={400}
        />
      </section>
      <section className="border-2 p-4 popular-posts-section">
        <h3 className="text-center text-xl mb-2">
          Check out some of our most popular posts:
        </h3>
        <div className="flex flex-row gap-4 justify-center">
          {rows.map((post) => {
            return (
              <Link
                key={post.id}
                href={`/AllPosts/${post.id}`}
                className="bg-black text-white p-2 md:text-center"
              >
                {post.title}
                <Image
                  src={post.img_url}
                  width="100"
                  height="50"
                  alt={post.img_alt}
                  className="popular-posts-img flex-none md:border-white md:border-2"
                />
              </Link>
            );
          })}
        </div>
        <h3 className="text-center border-2 mt-2 pt-2 pb-2 md:border-none md: text-xl">
          Or <Link href="/AllPosts">view all our posts</Link>
        </h3>
      </section>
    </main>
  );
}
