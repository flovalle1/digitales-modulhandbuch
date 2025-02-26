import { auth } from '@/auth';
import { paths } from '@/paths';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

interface AuthGuardProps {
    children: ReactNode;
}


export const AuthGuard: React.FC<AuthGuardProps> = async ({ children }) => {
    const session = await auth();

    if (!session) {
        redirect(paths.signIn);
    }

    if (session) {
        return <>{children}</>;
    }

    return null;
};


export const LecturerGuard: React.FC<AuthGuardProps> = async ({ children }) => {
    const session = await auth();

    // @ts-expect-error: session type istn changeable in the dependency

    if (session?.user?.role == UserRole.LECTURER) {
        return <div> Du bist nicht berechtigt auf diese Seite zuzugreifen.</div>;
    }

    // @ts-expect-error: session type istn changeable in the dependency

    if (session?.user?.role == UserRole.ADMIN) {
        return <>{children}</>;
    }

    return null;
}
