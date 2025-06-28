import { useEffect } from 'react';
import axios from 'axios';
import Counter from '../Counter/Counter';

export default function Ordersummary({ order, products, handleIncrement, handleDecrement, setOrder, cart = false }) {
    if (Object.keys(order).length === 0) return null;

    const subtotal = products.reduce(
        (total, p) => total + (p.price * (order[p.id] || 0)),
        0
    );
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const shipping = 15;
    const total = subtotal + tax + shipping;

    useEffect(() => {
        localStorage.setItem('totals', JSON.stringify({ subtotal, tax, shipping, total }));
    }, [subtotal, tax, shipping, total]);

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const items = Object.entries(order).map(([productId, quantity]) => ({
                id: parseInt(productId),        // ✅ Use "id" instead of "product_id"
                quantity
            }));
            console.log(items,total);

            const response = await axios.post(`${window.Laravel.appUrl}/api/orders`, {
                products: items,
                subtotal,
                tax,
                shipping,
                total:total
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            alert('Order placed successfully!');
            localStorage.removeItem('order');
            localStorage.removeItem('totals');
            setOrder({});
            window.location.href = '/products'; // or navigate to /orders
        } catch (error) {
            console.error('Order failed', error);
            alert('Failed to place order');
        }
    };

    return (
        <div className="bg-white rounded shadow-sm">
            <h5 className="p-2 m-2 fw-semibold">
                Order Summary {cart ? <span>(#{Object.keys(order).length})</span> : ''}
            </h5>

            <ul className="list-group p-2 m-2">
                {products.filter(p => order[p.id]).map(p => (
                    <li key={p.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <img src={p.image_url} alt={p.name} height="70" />
                            <div className="row align-items-center ps-3">
                                <div className="col">
                                    <small className="fw-semibold">{p.name}</small>
                                </div>
                                <div className="col-auto">
                                    <Counter product={p} order={order} setOrder={setOrder} />
                                </div>
                            </div>
                            <a
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => {
                                    const updated = { ...order };
                                    delete updated[p.id];
                                    setOrder(updated);
                                }}
                            >
                                <i className="bi bi-trash-fill"></i>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>

            <ul className="p-2 m-2">
                <li className="list-group-item d-flex py-1 justify-content-between text-muted">
                    <small>Subtotal:</small><small>${subtotal.toFixed(2)}</small>
                </li>
                <li className="list-group-item d-flex py-1 justify-content-between text-muted">
                    <small>Tax (10%):</small><small>${tax.toFixed(2)}</small>
                </li>
                <li className="list-group-item d-flex py-1 justify-content-between text-muted">
                    <small>Shipping:</small><small>${shipping.toFixed(2)}</small>
                </li>
                <hr />
                <li className="list-group-item d-flex py-1 justify-content-between text-muted">
                    <small>Total:</small><small>${total.toFixed(2)}</small>
                </li>
                <hr />
                <li className="list-group-item d-flex py-1">
                    {cart ? (
                        <button onClick={handlePlaceOrder} className="btn btn-dark w-100 text-center py-2">
                            Place The Order
                        </button>
                    ) : (
                        <a href="/cart" className="btn btn-dark w-100 text-center py-2">
                            Proceed to Checkout
                        </a>
                    )}
                </li>
            </ul>
        </div>
    );
}
