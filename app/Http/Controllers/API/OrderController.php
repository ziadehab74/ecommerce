<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1'
        ]);

        $productsInput = collect($request->products);
        $productIds = $productsInput->pluck('id')->toArray();

        $products = Product::whereIn('id', $productIds)->get();

        // Check stock
        foreach ($productsInput as $input) {
            $product = $products->find($input['id']);
            if ($product->stock < $input['quantity']) {
                return response()->json(['message' => "Product {$product->name} does not have enough stock."], 400);
            }
        }

        // Create order
        $total = 0;
        foreach ($productsInput as $input) {
            $product = $products->find($input['id']);
            $total += $product->price * $input['quantity'];
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total' => $total,
        ]);

        foreach ($productsInput as $input) {
            $product = $products->find($input['id']);
            $order->products()->attach($product->id, ['quantity' => $input['quantity']]);
            $product->decrement('stock', $input['quantity']);
        }

        // event(new \App\Events\OrderPlaced($order));

        return response()->json(['message' => 'Order placed successfully.', 'order_id' => $order->id]);
    }

    public function show($id)
    {
        $order = Order::with('products')->findOrFail($id);

        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json([
            'order' => $order,
            'products' => $order->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $product->pivot->quantity,
                    'subtotal' => $product->price * $product->pivot->quantity
                ];
            }),
            'total' => $order->total
        ]);
    }
}
