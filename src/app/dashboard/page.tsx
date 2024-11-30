"use client";
import CreateCourseForm from '@/components/dashboard/createCourseForm';
import AuthGuard from "@/utils/auth/authguard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import { Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
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
        <AuthGuard>
            <DashboardLayout>
                <PageContainer>
                    {router.pathname == "/courses/add" && <CreateCourseForm />}
                    {router.pathname == "/courses/edit" && <CreateCourseForm />}
                </PageContainer>
            </DashboardLayout>
        </AuthGuard>
    );
}
