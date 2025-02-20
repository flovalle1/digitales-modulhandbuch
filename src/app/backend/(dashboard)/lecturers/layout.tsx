import { LecturerGuard } from '@/utils/auth/authguard';
import * as React from 'react';


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LecturerGuard>
            {children}
        </LecturerGuard>
    );
}