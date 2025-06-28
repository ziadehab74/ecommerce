import React, { useEffect, useState } from 'react';
import Ordersummary from './ordersummary.jsx';
import Counter from './counter.jsx';

export default function Cart() {
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0
    });

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem('order')) || {};
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const storedTotals = JSON.parse(localStorage.getItem('totals')) || {
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0
        };

        const fullCart = Object.entries(storedOrder).map(([productId, quantity]) => {
            const product = storedProducts.find(p => p.id === parseInt(productId));
            if (!product) return null;

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                quantity: quantity,
                category: product.category,
                stock: product.stock
            };
        }).filter(Boolean);

        setOrder(storedOrder);
        setProducts(storedProducts);
        setCartItems(fullCart);
        setTotals(storedTotals);
    }, []);

    return (
        <div>
            <div className="container mt-5">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <div className="list-group">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="list-group-item d-flex">
                                        <div className="col-md-4 p-2">
                                            <img src={item.image} alt={item.name} width="100px" />
                                        </div>
                                        <div className="col-md-8 d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="mb-1">{item.name}</h5>
                                                <small>Quantity: {item.quantity}</small>
                                                <Counter
                                                    product={item}
                                                    order={order}
                                                    setOrder={setOrder}
                                                />
                                            </div>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Ordersummary
                                order={order}
                                products={products}
                                setOrder={setOrder}
                                cart={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>



    );
}
