"use client";
import CreateCourseForm from '@/components/dashboard/createCourseForm';
import { NotificationsProvider } from '@toolpad/core';

export default function DashboardLayoutBasic() {
    return (
        <>
            <NotificationsProvider >
                <CreateCourseForm />
            </NotificationsProvider>
        </>
    );
}
