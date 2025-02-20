import { AuthGuard } from '@/utils/auth/authguard';
import { DashboardLayout, PageContainer } from '@toolpad/core';
import * as React from 'react';


export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <DashboardLayout>
                <PageContainer>
                    {children}
                </PageContainer>
            </DashboardLayout>
        </AuthGuard>
    );
}