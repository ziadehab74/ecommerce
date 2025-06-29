<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Wireless Mouse',
                'price' => 29.99,
                'category' => 'Electronics',
                'stock' => 50,
                'image' => 'products/mouse.webp',
            ],
            [
                'name' => 'Bluetooth Headphones',
                'price' => 89.99,
                'category' => 'Electronics',
                'stock' => 30,
                'image' => 'products/headphones.webp',
            ],
            [
                'name' => 'Coffee Mug',
                'price' => 12.49,
                'category' => 'Kitchen',
                'stock' => 100,
                'image' => 'products/cofemug.webp',
            ],
            [
                'name' => 'Desk Lamp',
                'price' => 39.95,
                'category' => 'Office',
                'stock' => 25,
                'image' => 'products/desklamp.webp',
            ],
            [
                'name' => 'Notebook',
                'price' => 4.99,
                'category' => 'Stationery',
                'stock' => 200,
                'image' => 'products/notebook.webp',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
