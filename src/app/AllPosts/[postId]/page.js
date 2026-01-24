import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";

export default async function IndividualPostPage({ params }) {
  const { postId } = await params;
  const mainContentQuery = await db.query(
    `SELECT * FROM facts_posts WHERE id = $1`,
    [postId],
  );
  const mainContent = mainContentQuery.rows[0];
  const mainCopy = mainContent.content.split("\r\n");

  const commentsQuery = await db.query(
    `SELECT * FROM facts_posts_comments WHERE fact_post_id = $1`,
    [postId],
  );
  const commentsData = commentsQuery.rows;

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      username: rawFormData.get("username"),
      comment_date: rawFormData.get("comment_date"),
      comment_content: rawFormData.get("comment_content"),
      fact_post_id: mainContent.id,
    };
    db.query(
      `INSERT INTO facts_posts_comments (username, comment_date, comment_content, fact_post_id) VALUES ($1, $2, $3, $4)`,
      [
        formValues.username,
        formValues.comment_date,
        formValues.comment_content,
        formValues.fact_post_id,
      ],
    );
    revalidatePath(`/AllPosts/${postId}`);
    redirect(`/AllPosts/${postId}`);
  }

  const dateString = mainContent.date_posted.toString().slice(0, 15);

  return (
    <>
      <section>
        <Link href={"/AllPosts"}>Go back to all posts</Link>
        <h2>{mainContent.title}</h2>
        <h3>{dateString}</h3>
        <Image
          src={mainContent.img_url}
          alt={mainContent.img_alt}
          width="400"
          height="300"
        />
        <article>
          {mainCopy.map((paragraph) => {
            return <p>{paragraph}</p>;
          })}
        </article>
      </section>
      <section>
        <h4>Share Your Thoughts:</h4>
        <form action={handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input type="text" name="username" required />
          <label htmlFor="comment_date">Date:</label>
          <input type="date" name="comment_date" required />
          <label htmlFor="comment_content">Comments:</label>
          <input type="text" name="comment_content" required />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <h5>Comments:</h5>
        {commentsData.map((comment) => {
          return (
            <div key={comment.id}>
              <h6>{comment.username}</h6>

              <p>{comment.comment_date.toString()}</p>
              <p>{comment.comment_content}</p>
              <DeleteButton commentId={comment.id} postId={postId} />
            </div>
          );
        })}
      </section>
    </>
  );
}
