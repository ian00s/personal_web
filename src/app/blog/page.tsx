import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

async function getBlogPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      votes: true,
    },
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Thoughts, ideas, and insights on various topics
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => {
            // Calculate total votes
            const totalVotes = post.votes.reduce(
              (acc, vote) => acc + vote.value,
              0
            );

            return (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-8 last:border-0"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{post.author.name}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.createdAt.toString()}>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </time>
                  <span className="mx-2">•</span>
                  <span>
                    {totalVotes > 0 ? `+${totalVotes}` : totalVotes} votes
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {post.excerpt || `${post.content.substring(0, 200)}...`}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                >
                  Read more →
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-gray-600">Check back soon for new content!</p>
        </div>
      )}
    </div>
  );
}
