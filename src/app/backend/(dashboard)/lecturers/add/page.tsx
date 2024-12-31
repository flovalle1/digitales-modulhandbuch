"use client";
import CreateLecturerForm from '@/components/dashboard/createLecturerForm';
import { NotificationsProvider } from '@toolpad/core';

export default function Page() {
    return (
        <>
            <NotificationsProvider>
                <CreateLecturerForm />
            </NotificationsProvider>
        </>
    );
}
