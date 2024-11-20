import AuthGuard from "@/utils/auth/authguard";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <AuthGuard>
                {children}
            </AuthGuard>
        </SessionProvider>

    );
}