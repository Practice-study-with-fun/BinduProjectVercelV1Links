'use server'
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServerSession } from "@/lib/auth-server";




export const UserInformation = async () => {
    
    type UserInformationProps = {
        userEmail: string;
    };
    const headersList = await headers();
    const session = await getServerSession({
        headers: headersList,
    });
    if (!session) redirect("/auth/login");
    const email = String(session.user.email);
    // Form implementation
    return email;
};
