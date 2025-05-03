import { requireAdmin } from "@/lib/auth";
import PostForm from "@/components/PostForm";

export const metadata = {
  title: "Create New Post | My Personal Website",
  description: "Create a new blog post",
};

export default async function NewPostPage() {
  // Ensure only admin can access this page
  await requireAdmin();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PostForm />
      </div>
    </div>
  );
}
