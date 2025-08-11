<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get basic stats
        $stats = [
            'total_products' => Product::active()->count(),
            'low_stock_products' => Product::lowStock()->count(),
            'total_sales_today' => Sale::whereDate('created_at', today())->sum('total_amount'),
            'total_patients' => Patient::active()->count(),
        ];
        
        // Get recent sales (last 10)
        $recentSalesQuery = Sale::with(['patient', 'cashier'])
            ->latest()
            ->take(10)
            ->get();
        
        $recent_sales = [];
        foreach ($recentSalesQuery as $sale) {
            $recent_sales[] = [
                'id' => $sale->id,
                'receipt_number' => $sale->receipt_number,
                'total_amount' => $sale->total_amount,
                'patient_name' => $sale->patient !== null ? $sale->patient->name : 'Walk-in',
                'cashier_name' => $sale->cashier->name,
                'created_at' => $sale->created_at->format('M d, Y H:i'),
            ];
        }
        
        // Get low stock products
        $lowStockQuery = Product::lowStock()
            ->active()
            ->with('supplier')
            ->take(10)
            ->get();
            
        $low_stock_products = [];
        foreach ($lowStockQuery as $product) {
            $low_stock_products[] = [
                'id' => $product->id,
                'name' => $product->name,
                'current_stock' => $product->current_stock,
                'minimum_stock' => $product->minimum_stock,
                'supplier_name' => $product->supplier !== null ? $product->supplier->name : 'No Supplier',
            ];
        }
        
        // Get daily sales for chart (last 7 days)
        $daily_sales = collect(range(6, 0))->map(function ($days_ago) {
            $date = now()->subDays($days_ago);
            $total = Sale::whereDate('created_at', $date)->sum('total_amount');
            
            return [
                'date' => $date->format('M d'),
                'total' => $total,
            ];
        });

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_sales' => $recent_sales,
            'low_stock_products' => $low_stock_products,
            'daily_sales' => $daily_sales,
            'user_role' => $user->role,
        ]);
    }
}