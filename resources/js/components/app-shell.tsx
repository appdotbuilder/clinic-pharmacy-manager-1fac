import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItem[];
}

export function AppShell({ children, variant = 'sidebar', breadcrumbs = [] }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </SidebarProvider>
    );
}
