import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Package, ShoppingCart, Users, TrendingUp, AlertTriangle, UserCheck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '/products',
        icon: Package,
        items: [
            {
                title: 'All Products',
                href: '/products',
            },
            {
                title: 'Add Product',
                href: '/products/create',
            },
            {
                title: 'Low Stock',
                href: '/products?low_stock=true',
            },
        ],
    },
    {
        title: 'Point of Sale',
        href: '/pos',
        icon: ShoppingCart,
    },
    {
        title: 'Patients',
        href: '/patients',
        icon: Users,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: TrendingUp,
        items: [
            {
                title: 'Sales Report',
                href: '/reports/sales',
            },
            {
                title: 'Stock Report',
                href: '/reports/stock',
            },
            {
                title: 'Patient Report',
                href: '/reports/patients',
            },
        ],
    },
    {
        title: 'Suppliers',
        href: '/suppliers',
        icon: UserCheck,
    },
    {
        title: 'Alerts',
        href: '/alerts',
        icon: AlertTriangle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'PharmaCare Docs',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Support',
        href: '#',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
