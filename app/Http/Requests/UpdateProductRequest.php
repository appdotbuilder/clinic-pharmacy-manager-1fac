<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'generic_name' => 'nullable|string|max:255',
            'brand' => 'nullable|string|max:255',
            'barcode' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'barcode')->ignore($this->route('product')->id),
            ],
            'category' => 'required|in:medicine,medical_supply,equipment,other',
            'dosage_form' => 'nullable|string|max:255',
            'strength' => 'nullable|string|max:255',
            'unit' => 'required|string|max:255',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:1',
            'expiry_date' => 'nullable|date|after:today',
            'batch_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'requires_prescription' => 'boolean',
            'is_active' => 'boolean',
            'supplier_id' => 'nullable|exists:suppliers,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required.',
            'category.required' => 'Product category is required.',
            'unit.required' => 'Unit of measurement is required.',
            'purchase_price.required' => 'Purchase price is required.',
            'selling_price.required' => 'Selling price is required.',
            'current_stock.required' => 'Current stock is required.',
            'minimum_stock.required' => 'Minimum stock level is required.',
            'barcode.unique' => 'This barcode is already in use.',
            'expiry_date.after' => 'Expiry date must be in the future.',
        ];
    }
}