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

  const mainDateString = mainContent.date_posted.toString().slice(0, 15);

  return (
    <>
      <section className="mt-4 mb-4">
        <Link href={"/AllPosts"} className="border-2 p-2">
          Go back to all posts
        </Link>
        <h2 className="text-xl mt-2">{mainContent.title}</h2>
        <h3>{mainDateString}</h3>
        <Image
          src={mainContent.img_url}
          alt={mainContent.img_alt}
          width="400"
          height="300"
        />
        <article>
          {mainCopy.map((paragraph, index) => {
            return (
              <p key={index}>
                {paragraph}
                <br />
              </p>
            );
          })}
        </article>
      </section>
      <section className="comments-form border-2 p-2 mt-2">
        <h4 className="text-center text-xl font-bold">Share Your Thoughts:</h4>
        <form action={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="username">Name:</label>
          <input type="text" name="username" required />
          <label htmlFor="comment_date">Date:</label>
          <input type="date" name="comment_date" required />
          <label htmlFor="comment_content">Comments:</label>
          <textarea type="text" name="comment_content" rows="4" required />
          <button type="submit" className="border-2 p-1 mt-2">
            Submit
          </button>
        </form>
      </section>
      <section className="prev-comments bg-black text-white mt-4 pb-2">
        <h5 className="text-center text-xl font-bold pt-2 pb-2">Comments:</h5>
        {commentsData.map((comment) => {
          return (
            <div
              key={comment.id}
              className="bg-white text-black p-3 border-2 m-4"
            >
              <p>{comment.comment_date.toString().slice(0, 15)}</p>
              <h6 className="font-bold">{comment.username} says...</h6>
              <p className="mb-2">&quot;{comment.comment_content}&quot;</p>
              <DeleteButton commentId={comment.id} postId={postId} />
            </div>
          );
        })}
      </section>
    </>
  );
}
