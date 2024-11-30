"use client";
import CreateCourseForm from '@/components/dashboard/createCourseForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import { extendTheme } from '@mui/material/styles';
import { Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/nextjs';
import { PageContainer } from '@toolpad/core/PageContainer';
import * as React from 'react';

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
        segment: 'courses',
        title: 'Kurse',
        icon: <StyleIcon />,
        children: [
            {
                segment: 'add',
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
        segment: 'integrations',
        title: 'Dozentenprofil',
        icon: <AccountCircleIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}


export default function DashboardLayoutBasic(props: any) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{ title: 'Dozenten Backend', logo: <img src="/Universitaet_Tuebingen.png" alt="Logo" /> }}
        >
            <DashboardLayout>
                <PageContainer>
                    {router.pathname == "/courses/add" && <CreateCourseForm />}
                    {router.pathname == "/courses/edit" && <CreateCourseForm />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
