import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider } from "next-auth/react";


import * as React from 'react';
import theme from '../theme';


const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Übersicht',
    },
    {
        segment: 'dashboard',
        title: 'Meine Kurse',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Bearbeiten',
    },
    {
        segment: 'dashboard/courses',
        title: 'Kurse',
        icon: <StyleIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Hinzufügen',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'edit',
                title: 'Bearbeiten',
                icon: <DescriptionIcon />,
                pattern: 'edit{/:courseId}*',
            },
        ],
    },
    {
        segment: 'dashboard/lecturers',
        title: 'Dozentenprofil',
        icon: <AccountCircleIcon />,
    },
];

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <AppProvider
                navigation={NAVIGATION}
                theme={theme}
                branding={{ title: 'Dozenten Backend', logo: <img src="/Universitaet_Tuebingen.png" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} /> }}
            >
                {children}
            </AppProvider>

        </SessionProvider>
    );
}