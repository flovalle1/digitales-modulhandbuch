"use client";
import { signIn, useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading' || status === 'unauthenticated') {
        return <div>laden...</div>;
    }

    if (status === 'authenticated') {
        return <>{children}</>;
    }

    return null;
};

export default AuthGuard;