"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserRole } from "@prisma/client";

export async function updateUserRoleAction({ userId, newRole }: { userId: string; newRole: UserRole }) {
  try {
    // Get current session to verify admin permissions
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        error: "Not authenticated",
        success: false,
      };
    }

    // Check if current user is admin
    if (session.user.role !== "ADMIN") {
      return {
        error: "Insufficient permissions. Admin access required.",
        success: false,
      };
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      error: "Failed to update user role. Please try again.",
      success: false,
    };
  }
}