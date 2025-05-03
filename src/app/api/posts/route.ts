import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Check if the user is an admin
    const user = await requireAdmin();

    // Parse the request body
    const { title, content, excerpt, slug, published, featured } =
      await req.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create a slug if not provided
    let postSlug = slug;
    if (!postSlug) {
      postSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }

    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug: postSlug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        slug: postSlug,
        published: !!published,
        featured: !!featured,
        author: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);

    // Handle authentication errors
    if ((error as any).message === "NEXT_REDIRECT") {
      throw error; // Let Next.js handle redirects from requireAdmin
    }

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
