import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PharmaCare - Clinic Pharmacy Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 via-white to-green-50 text-gray-900">
                {/* Header */}
                <header className="w-full border-b border-teal-100 bg-white/70 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="rounded-lg bg-gradient-to-r from-teal-600 to-green-600 p-2">
                                    <span className="text-2xl text-white">💊</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">PharmaCare</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border border-teal-300 px-6 py-2.5 font-medium text-teal-700 transition-all hover:bg-teal-50"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-800">
                                        🏥 Professional Healthcare Management
                                    </div>
                                    <h1 className="text-5xl font-bold leading-tight text-gray-900">
                                        Complete Pharmacy Management for Your{' '}
                                        <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                                            Clinic
                                        </span>
                                    </h1>
                                    <p className="text-xl leading-relaxed text-gray-600">
                                        Streamline your clinic pharmacy operations with our comprehensive management system. From inventory control to POS transactions, everything you need in one place.
                                    </p>
                                </div>

                                {/* Key Features */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="mt-0.5 rounded-lg bg-teal-100 p-2">
                                            <span className="text-lg">📦</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Stock Management</h3>
                                            <p className="text-sm text-gray-600">Complete inventory control with low stock alerts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="mt-0.5 rounded-lg bg-green-100 p-2">
                                            <span className="text-lg">💳</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Point of Sale</h3>
                                            <p className="text-sm text-gray-600">Fast checkout with receipt printing</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="mt-0.5 rounded-lg bg-teal-100 p-2">
                                            <span className="text-lg">👥</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Role Management</h3>
                                            <p className="text-sm text-gray-600">Admin, Cashier, and Doctor access levels</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
                                        <div className="mt-0.5 rounded-lg bg-green-100 p-2">
                                            <span className="text-lg">📊</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
                                            <p className="text-sm text-gray-600">Sales reports and transaction history</p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                {!auth.user && (
                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-gradient-to-r from-teal-600 to-green-600 px-8 py-4 text-center font-semibold text-white shadow-lg transition-all hover:from-teal-700 hover:to-green-700 hover:shadow-xl"
                                        >
                                            Start Free Trial
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border-2 border-teal-300 px-8 py-4 text-center font-semibold text-teal-700 transition-all hover:bg-teal-50"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Right Content - Feature Preview */}
                            <div className="relative">
                                <div className="rounded-2xl bg-white p-8 shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
                                            <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                Live Demo
                                            </div>
                                        </div>
                                        
                                        {/* Demo Stats */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-lg bg-teal-50 p-4">
                                                <div className="text-2xl font-bold text-teal-600">247</div>
                                                <div className="text-sm text-teal-600">Products in Stock</div>
                                            </div>
                                            <div className="rounded-lg bg-green-50 p-4">
                                                <div className="text-2xl font-bold text-green-600">₦85,420</div>
                                                <div className="text-sm text-green-600">Today's Sales</div>
                                            </div>
                                        </div>
                                        
                                        {/* Demo Recent Activity */}
                                        <div>
                                            <h4 className="mb-3 font-medium text-gray-900">Recent Transactions</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                                                            <span className="text-sm">💊</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium">Paracetamol 500mg</div>
                                                            <div className="text-xs text-gray-500">2 mins ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-semibold text-green-600">₦1,200</div>
                                                </div>
                                                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                            <span className="text-sm">🩹</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium">Bandages Pack</div>
                                                            <div className="text-xs text-gray-500">5 mins ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-semibold text-green-600">₦800</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Floating elements */}
                                <div className="absolute -right-4 -top-4 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 p-4 text-white shadow-lg">
                                    <div className="text-sm font-medium">Stock Alert</div>
                                    <div className="text-xs">3 items running low</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-white/50 py-20">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Manage Your Pharmacy</h2>
                                <p className="text-lg text-gray-600 mb-12">Designed specifically for clinic pharmacies with real-world requirements</p>
                            </div>
                            
                            <div className="grid gap-8 md:grid-cols-3">
                                <div className="rounded-xl bg-white p-8 shadow-lg">
                                    <div className="mb-4 rounded-lg bg-teal-100 p-3 w-fit">
                                        <span className="text-2xl">🔍</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Smart Search & Filter</h3>
                                    <p className="text-gray-600">Find products instantly by name, generic name, barcode, or category. Advanced filtering for efficient inventory management.</p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg">
                                    <div className="mb-4 rounded-lg bg-green-100 p-3 w-fit">
                                        <span className="text-2xl">🔔</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Smart Notifications</h3>
                                    <p className="text-gray-600">Automatic alerts for low stock, expired products, and important pharmacy events. Never miss critical updates.</p>
                                </div>
                                
                                <div className="rounded-xl bg-white p-8 shadow-lg">
                                    <div className="mb-4 rounded-lg bg-teal-100 p-3 w-fit">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Mobile Responsive</h3>
                                    <p className="text-gray-600">Works perfectly on tablets and phones. Large touch-friendly buttons make POS operations seamless on any device.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="rounded-lg bg-gradient-to-r from-teal-600 to-green-600 p-2">
                                    <span className="text-lg text-white">💊</span>
                                </div>
                                <span className="text-lg font-bold">PharmaCare</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Built with ❤️ by{' '}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}