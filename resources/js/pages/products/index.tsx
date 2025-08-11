import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    generic_name: string | null;
    brand: string | null;
    barcode: string | null;
    category: string;
    selling_price: number;
    current_stock: number;
    minimum_stock: number;
    is_active: boolean;
    supplier: {
        id: number;
        name: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    products: {
        data: Product[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    suppliers: Array<{
        id: number;
        name: string;
    }>;
    filters: {
        search?: string;
        category?: string;
        low_stock?: boolean;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

const categories = [
    { value: 'medicine', label: 'Medicine' },
    { value: 'medical_supply', label: 'Medical Supply' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'other', label: 'Other' },
];

export default function ProductsIndex({ products, filters }: Props) {
    
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        low_stock: filters.low_stock || false,
        status: filters.status || '',
    });

    const handleFilter = () => {
        get(route('products.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setData({
            search: '',
            category: '',
            low_stock: false,
            status: '',
        });
        router.get(route('products.index'));
    };

    const getCategoryBadgeColor = (category: string) => {
        switch (category) {
            case 'medicine':
                return 'bg-blue-100 text-blue-800';
            case 'medical_supply':
                return 'bg-green-100 text-green-800';
            case 'equipment':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStockStatus = (product: Product) => {
        if (product.current_stock === 0) {
            return { label: 'Out of Stock', class: 'bg-red-100 text-red-800' };
        } else if (product.current_stock <= product.minimum_stock) {
            return { label: 'Low Stock', class: 'bg-amber-100 text-amber-800' };
        } else {
            return { label: 'In Stock', class: 'bg-green-100 text-green-800' };
        }
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Products - PharmaCare" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-600 mt-1">Manage your pharmacy inventory</p>
                    </div>
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700"
                    >
                        <span className="mr-2">➕</span>
                        Add Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-xl bg-white p-6 shadow-lg">
                    <div className="grid gap-4 md:grid-cols-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search
                            </label>
                            <input
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                placeholder="Search products..."
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        
                        <div className="flex items-end">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.low_stock}
                                    onChange={(e) => setData('low_stock', e.target.checked)}
                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Low Stock Only</span>
                            </label>
                        </div>
                        
                        <div className="flex items-end space-x-2">
                            <Button onClick={handleFilter} className="bg-teal-600 hover:bg-teal-700">
                                Filter
                            </Button>
                            <Button onClick={clearFilters} variant="outline">
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.data.map((product) => {
                        const stockStatus = getStockStatus(product);
                        return (
                            <div key={product.id} className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                                        {product.generic_name && (
                                            <p className="text-sm text-gray-600">Generic: {product.generic_name}</p>
                                        )}
                                        {product.brand && (
                                            <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                                        )}
                                    </div>
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getCategoryBadgeColor(product.category)}`}>
                                        {categories.find(c => c.value === product.category)?.label}
                                    </span>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Price:</span>
                                        <span className="font-medium text-gray-900">₦{product.selling_price.toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Stock:</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-900">{product.current_stock}</span>
                                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${stockStatus.class}`}>
                                                {stockStatus.label}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {product.supplier && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Supplier:</span>
                                            <span className="text-sm font-medium text-gray-900">{product.supplier.name}</span>
                                        </div>
                                    )}
                                    
                                    {product.barcode && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Barcode:</span>
                                            <span className="text-sm font-mono text-gray-900">{product.barcode}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route('products.show', product.id)}
                                        className="flex-1 text-center rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="flex-1 text-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {products.data.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📦</span>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">
                            {Object.values(filters).some(v => v) 
                                ? 'Try adjusting your filters or search terms.'
                                : 'Get started by adding your first product.'
                            }
                        </p>
                        <Link
                            href={route('products.create')}
                            className="inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            <span className="mr-2">➕</span>
                            Add Product
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-lg">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{((products.current_page - 1) * 15) + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(products.current_page * 15, products.total)}</span> of{' '}
                            <span className="font-medium">{products.total}</span> results
                        </div>
                        
                        <div className="flex space-x-1">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                        link.active
                                            ? 'bg-teal-600 text-white'
                                            : link.url
                                            ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}