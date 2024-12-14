"use client";
import { paths } from '@/paths';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

interface AuthGuardProps {
    children: ReactNode;
}


const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(paths.signIn);
        }
    }, [status]);

    if (status === 'loading' || status === 'unauthenticated') {
        return <div>laden...</div>;
    }

    if (status === 'authenticated' && session) {
        return <>{children}</>;
    }

    return null;
};

export default AuthGuard;