"use client";
import CreateCourseForm from '@/components/dashboard/createCourseForm';
import AuthGuard from "@/utils/auth/authguard";
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function DashboardLayoutBasic() {
    return (
        <AuthGuard>
            <DashboardLayout>
                <PageContainer>
                    <CreateCourseForm />
                </PageContainer>
            </DashboardLayout>
        </AuthGuard>
    );
}
