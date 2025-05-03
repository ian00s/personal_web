import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import VoteButtons from "@/components/VoteButtons";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      votes: true,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);

  // Calculate total votes
  const totalVotes = post.votes.reduce((acc, vote) => acc + vote.value, 0);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            {post.author.image ? (
              <img
                src={post.author.image}
                alt={post.author.name || "Author"}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
            )}
            <div>
              <p className="font-medium">{post.author.name}</p>
              <time
                className="text-sm text-gray-500"
                dateTime={post.createdAt.toString()}
              >
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </header>

      <div className="prose max-w-none mb-10">
        {post.content.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6 mt-10">
        <VoteButtons postId={post.id} initialVotes={totalVotes} />
      </div>
    </article>
  );
}
