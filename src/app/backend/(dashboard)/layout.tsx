

import { DashboardLayout, PageContainer } from '@toolpad/core';
import * as React from 'react';


export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayout>
            <PageContainer>
                {children}
            </PageContainer>
        </DashboardLayout>
    );
}