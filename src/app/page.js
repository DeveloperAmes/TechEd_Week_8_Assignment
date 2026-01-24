import Image from "next/image";
import Link from "next/link";
import { db } from "@/utils/dbConnection";

export default async function HomePage() {
  const { rows } = await db.query(`SELECT * FROM facts_posts LIMIT 3`);
  return (
    <main>
      <section className="hero-image mt-24">
        <Image
          src="/assets/chatgtpwomendata.png"
          alt="Representation of research on women having incomplete data compared to men."
          width={600}
          height={400}
        />
      </section>
      <section>
        <h3>Check out some of our most popular posts:</h3>
        <div className="flex flex-row gap-6 justify-center">
          {rows.map((post) => {
            return (
              <section key={post.id}>
                <div key={post.id}>
                  <Link href={`/AllPosts/${post.id}`}>
                    {post.title}
                    <Image
                      src={post.img_url}
                      width="100"
                      height="50"
                      alt={post.img_alt}
                      className="flex-none"
                    />
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
        <h3>
          Or view <Link href="/AllPosts">all our posts</Link>
        </h3>
      </section>
    </main>
  );
}
