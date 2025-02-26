import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import StyleIcon from '@mui/icons-material/Style';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider } from "next-auth/react";


import { auth } from '@/auth';
import { UserRole } from '@prisma/client';
import Image from 'next/image';
import * as React from 'react';
import theme from '../theme';


const ADMIN_NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Übersicht',
    },
    {
        segment: 'backend',
        title: 'Übersicht',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Hinzufügen',
    },
    {
        segment: 'backend/courses',
        title: 'Kurse',
        icon: <StyleIcon />,
        children: [
            {
                segment: 'add',
                title: 'Hinzufügen',
                icon: <DescriptionIcon />,
            }
        ],
    },
    {
        segment: 'backend/lecturers',
        title: 'Dozenten',
        icon: <SchoolIcon />,
        children: [
            {
                segment: 'add',
                title: 'Hinzufügen',
                icon: <DescriptionIcon />,
            }
        ],
    },
    {
        segment: 'backend/accounts',
        title: 'Accounts',
        icon: <AccountCircleIcon />,
        children: [
            {
                segment: 'add',
                title: 'Hinzufügen',
                icon: <DescriptionIcon />,
            }
        ],
    },
];

const LECTURER_NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Übersicht',
    },
    {
        segment: 'backend',
        title: 'Meine Kurse',
        icon: <DashboardIcon />,
    }
]



export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    //@ts-expect-error: session type istn changeable in the dependency
    const NAVIGATION = session?.user?.role === UserRole.ADMIN ? ADMIN_NAVIGATION : LECTURER_NAVIGATION;

    return (
        <SessionProvider>
            <AppProvider
                navigation={NAVIGATION}
                theme={theme}
                branding={{ title: 'Dozenten Backend', logo: <Image src="/Universitaet_Tuebingen.png" alt="Logo" width={150} height={150} style={{ maxWidth: '100%', height: 'auto' }} /> }}
            >
                {children}
            </AppProvider>
        </SessionProvider>
    );
}