"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export interface LinkData {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// Get all links for the current user
export async function getLinksAction(): Promise<{
  success: boolean;
  links?: LinkData[];
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const links = await prisma.link.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      links: links.map((link) => ({
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        userId: link.userId,
      })),
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return {
      success: false,
      error: "Failed to fetch links",
    };
  }
}

// Create a new link
export async function createLinkAction(data: {
  title: string;
  url: string;
  description?: string;
}): Promise<{
  success: boolean;
  link?: LinkData;
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Validate URL format
    try {
      new URL(data.url);
    } catch {
      return {
        success: false,
        error: "Invalid URL format",
      };
    }

    const link = await prisma.link.create({
      data: {
        title: data.title,
        url: data.url,
        description: data.description || null,
        userId: session.user.id,
      },
    });

    revalidatePath("/links");
    revalidatePath("/links-update");

    return {
      success: true,
      link: {
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        userId: link.userId,
      },
    };
  } catch (error) {
    console.error("Error creating link:", error);
    return {
      success: false,
      error: "Failed to create link",
    };
  }
}

// Update an existing link
export async function updateLinkAction(data: {
  id: string;
  title: string;
  url: string;
  description?: string;
}): Promise<{
  success: boolean;
  link?: LinkData;
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Validate URL format
    try {
      new URL(data.url);
    } catch {
      return {
        success: false,
        error: "Invalid URL format",
      };
    }

    // Check if link exists and belongs to user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: data.id,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        error: "Link not found or access denied",
      };
    }

    const link = await prisma.link.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        url: data.url,
        description: data.description || null,
      },
    });

    revalidatePath("/links");
    revalidatePath("/links-update");

    return {
      success: true,
      link: {
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        userId: link.userId,
      },
    };
  } catch (error) {
    console.error("Error updating link:", error);
    return {
      success: false,
      error: "Failed to update link",
    };
  }
}

// Delete a link
export async function deleteLinkAction(linkId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Check if link exists and belongs to user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        error: "Link not found or access denied",
      };
    }

    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });

    revalidatePath("/links");
    revalidatePath("/links-update");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting link:", error);
    return {
      success: false,
      error: "Failed to delete link",
    };
  }
}

// Get a single link by ID
export async function getLinkAction(linkId: string): Promise<{
  success: boolean;
  link?: LinkData;
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!link) {
      return {
        success: false,
        error: "Link not found",
      };
    }

    return {
      success: true,
      link: {
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        userId: link.userId,
      },
    };
  } catch (error) {
    console.error("Error fetching link:", error);
    return {
      success: false,
      error: "Failed to fetch link",
    };
  }
}

// Get all links for admin (all users' links)
export async function getAllLinksAdminAction(): Promise<{
  success: boolean;
  links?: (LinkData & { userName: string; userEmail: string })[];
  error?: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        success: false,
        error: "Admin access required",
      };
    }

    const links = await prisma.link.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      links: links.map((link) => ({
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        userId: link.userId,
        userName: link.user.name,
        userEmail: link.user.email,
      })),
    };
  } catch (error) {
    console.error("Error fetching all links:", error);
    return {
      success: false,
      error: "Failed to fetch links",
    };
  }
}