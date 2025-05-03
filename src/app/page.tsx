import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FiArrowRight } from "react-icons/fi";

async function getFeaturedPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to My Personal Website
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          A minimalist platform where I share my thoughts, experiences, and
          expertise
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/blog"
            className="bg-black text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-gray-800 transition-colors"
          >
            Read My Blog <FiArrowRight className="ml-2" />
          </Link>
          <Link
            href="/about"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Posts</h2>
          <Link
            href="/blog"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            View all <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 h-full transition-all hover:shadow-md">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        By {post.author.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No featured posts yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
