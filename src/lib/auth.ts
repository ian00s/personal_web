import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect("/login");
  }

  return user;
}
