import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import {
  FiEdit,
  FiEye,
  FiPlusCircle,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";

export const metadata = {
  title: "Admin Dashboard | My Personal Website",
  description: "Manage your blog posts",
};

async function getBlogPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
    },
  });
}

export default async function AdminPage() {
  // Only allow admin to access this page
  await requireAdmin();

  const posts = await getBlogPosts();

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-800 transition-colors"
        >
          <FiPlusCircle className="mr-2" /> New Post
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>

          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 px-4">Date</th>
                    <th className="pb-3 px-4">Votes</th>
                    <th className="pb-3 pl-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => {
                    const totalVotes = post.votes.reduce(
                      (acc, vote) => acc + vote.value,
                      0
                    );

                    return (
                      <tr
                        key={post.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 pr-4">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {post.excerpt || post.content.substring(0, 100)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.published
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {totalVotes > 0 ? `+${totalVotes}` : totalVotes}
                        </td>
                        <td className="py-4 pl-4">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/posts/${post.id}/edit`}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <FiEdit size={18} />
                            </Link>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-gray-600 hover:text-gray-800"
                              title="View"
                            >
                              <FiEye size={18} />
                            </Link>
                            <Link
                              href={`/api/posts/${post.id}/toggle-publish`}
                              className="text-orange-600 hover:text-orange-800"
                              title={post.published ? "Unpublish" : "Publish"}
                            >
                              {post.published ? (
                                <FiToggleRight size={18} />
                              ) : (
                                <FiToggleLeft size={18} />
                              )}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                You haven't created any posts yet.
              </p>
              <Link
                href="/admin/posts/new"
                className="bg-black text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-gray-800 transition-colors"
              >
                <FiPlusCircle className="mr-2" /> Create Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
