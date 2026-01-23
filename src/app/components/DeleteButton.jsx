import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
export default function DeleteButton({ commentId, postId }) {
  async function handleDelete() {
    "use server";
    const deleteComment = await db.query(
      `DELETE FROM facts_posts_comments WHERE id = $1`,
      [commentId],
    );
    revalidatePath(`/AllPosts/${postId}`);
    // redirect(`/AllPosts/${postId}`);
  }
  return (
    <form action={handleDelete}>
      <button type="submit">Delete comment</button>
    </form>
  );
}
