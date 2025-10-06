import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LinksUpdateClientPage from "./LinksUpdateClientPage";

export default async function LinksUpdateServerWrapper() {
  const headersList = await headers();
  
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // If not authenticated, redirect to login
  if (!session) {
    redirect("/auth/login");
  }

  // If authenticated but not admin, redirect to home
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  // If authenticated and admin, render the client component
  return <LinksUpdateClientPage user={session.user} />;
}