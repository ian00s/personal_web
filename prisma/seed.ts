import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Admin user details - replace with your information
    const email = "admin@example.com";
    const name = "Admin User";
    const password = "password123"; // Change this to a strong password

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      return;
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the admin user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    console.log(`Admin user created: ${user.email}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
