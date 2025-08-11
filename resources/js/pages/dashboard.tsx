import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    stats: {
        total_products: number;
        low_stock_products: number;
        total_sales_today: number;
        total_patients: number;
    };
    recent_sales: Array<{
        id: number;
        receipt_number: string;
        total_amount: number;
        patient_name: string;
        cashier_name: string;
        created_at: string;
    }>;
    low_stock_products: Array<{
        id: number;
        name: string;
        current_stock: number;
        minimum_stock: number;
        supplier_name: string;
    }>;
    daily_sales: Array<{
        date: string;
        total: number;
    }>;
    user_role: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recent_sales, low_stock_products, daily_sales, user_role }: Props) {
    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - PharmaCare" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's your pharmacy overview.</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Role: <span className="capitalize font-medium text-teal-600">{user_role}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-100">Total Products</p>
                                <p className="text-3xl font-bold">{stats.total_products}</p>
                            </div>
                            <div className="rounded-full bg-white/20 p-3">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Low Stock Items</p>
                                <p className="text-3xl font-bold">{stats.low_stock_products}</p>
                            </div>
                            <div className="rounded-full bg-white/20 p-3">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                        {stats.low_stock_products > 0 && (
                            <div className="mt-2">
                                <Link
                                    href={route('products.index', { low_stock: true })}
                                    className="text-sm text-orange-100 hover:text-white underline"
                                >
                                    View items →
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Today's Sales</p>
                                <p className="text-3xl font-bold">₦{stats.total_sales_today.toLocaleString()}</p>
                            </div>
                            <div className="rounded-full bg-white/20 p-3">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Total Patients</p>
                                <p className="text-3xl font-bold">{stats.total_patients}</p>
                            </div>
                            <div className="rounded-full bg-white/20 p-3">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl bg-white p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href={route('products.create')}
                            className="flex items-center space-x-3 rounded-lg border-2 border-teal-200 bg-teal-50 p-4 text-teal-700 transition-all hover:border-teal-300 hover:bg-teal-100"
                        >
                            <span className="text-2xl">➕</span>
                            <div>
                                <div className="font-medium">Add Product</div>
                                <div className="text-sm text-teal-600">New medicine or supply</div>
                            </div>
                        </Link>

                        <Link
                            href={route('products.index')}
                            className="flex items-center space-x-3 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 text-blue-700 transition-all hover:border-blue-300 hover:bg-blue-100"
                        >
                            <span className="text-2xl">🔍</span>
                            <div>
                                <div className="font-medium">View Products</div>
                                <div className="text-sm text-blue-600">Browse inventory</div>
                            </div>
                        </Link>

                        <button className="flex items-center space-x-3 rounded-lg border-2 border-green-200 bg-green-50 p-4 text-green-700 transition-all hover:border-green-300 hover:bg-green-100">
                            <span className="text-2xl">💳</span>
                            <div>
                                <div className="font-medium">Start Sale</div>
                                <div className="text-sm text-green-600">POS System</div>
                            </div>
                        </button>

                        <button className="flex items-center space-x-3 rounded-lg border-2 border-purple-200 bg-purple-50 p-4 text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-100">
                            <span className="text-2xl">📊</span>
                            <div>
                                <div className="font-medium">Reports</div>
                                <div className="text-sm text-purple-600">Sales & Analytics</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Sales */}
                    <div className="rounded-xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                                View All →
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recent_sales.length > 0 ? (
                                recent_sales.slice(0, 5).map((sale) => (
                                    <div key={sale.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div>
                                            <div className="font-medium text-gray-900">{sale.receipt_number}</div>
                                            <div className="text-sm text-gray-600">
                                                {sale.patient_name} • {sale.cashier_name}
                                            </div>
                                            <div className="text-xs text-gray-500">{sale.created_at}</div>
                                        </div>
                                        <div className="text-lg font-semibold text-green-600">
                                            ₦{sale.total_amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <span className="text-4xl mb-2 block">🛒</span>
                                    <p>No sales recorded yet</p>
                                    <p className="text-sm">Start making sales to see them here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="rounded-xl bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Low Stock Alert {low_stock_products.length > 0 && (
                                    <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                        {low_stock_products.length}
                                    </span>
                                )}
                            </h2>
                            <Link
                                href={route('products.index', { low_stock: true })}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {low_stock_products.length > 0 ? (
                                low_stock_products.slice(0, 5).map((product) => (
                                    <div key={product.id} className="flex items-center justify-between rounded-lg bg-red-50 p-3 border border-red-100">
                                        <div>
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-600">
                                                Supplier: {product.supplier_name}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-red-600">
                                                {product.current_stock} / {product.minimum_stock}
                                            </div>
                                            <div className="text-xs text-red-500">units left</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <span className="text-4xl mb-2 block">✅</span>
                                    <p>All products well stocked!</p>
                                    <p className="text-sm">No low stock alerts at the moment</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="rounded-xl bg-white p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Trend (Last 7 Days)</h2>
                    <div className="flex items-end justify-between space-x-2" style={{ height: '200px' }}>
                        {daily_sales.map((day, index) => {
                            const maxSale = Math.max(...daily_sales.map(d => d.total));
                            const height = maxSale > 0 ? (day.total / maxSale) * 160 : 20;
                            return (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div className="text-xs text-gray-600 mb-2 font-medium">
                                        ₦{day.total.toLocaleString()}
                                    </div>
                                    <div 
                                        className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg min-h-[20px]"
                                        style={{ height: `${height}px` }}
                                    ></div>
                                    <div className="text-xs text-gray-500 mt-2">{day.date}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}