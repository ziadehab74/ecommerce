import { use } from "react";
import { useEffect } from 'react';
import Counter from './counter.jsx';

export default function Ordersummary({ order, products, handleIncrement, handleDecrement, setOrder }) {
    if (Object.keys(order).length === 0) return null;

    // Calculations
    const subtotal = products.reduce(
        (total, p) => total + (p.price * (order[p.id] || 0)),
        0
    );
    const taxRate = 0.1; // 10%
    const tax = subtotal * taxRate;
    const shipping = 15;
    const total = subtotal + tax + shipping;
    useEffect(() => {
        localStorage.setItem('totals', JSON.stringify({ subtotal, tax, shipping, total }));
    }, [subtotal, tax, shipping, total]);
    return (
            <div className="bg-white  rounded shadow-sm">
                <h5 className="p-2 m-2 fw-semibold">Order Summary</h5>
                <ul className="list-group p-2 m-2">
                    {products.filter(p => order[p.id]).map(p => (
                        <li key={p.id} className="list-group-item">
                            {/* First Line: Name + Trash */}
                            <div className="d-flex justify-content-between align-items-center">
                                <img src={p.image_url} alt={p.name} height={"70px"} />
                                <div className="row align-items-center">
                                    <div className="col">
                                        <small className="fw-semibold">{p.name}</small>
                                    </div>
                                    <div className="col-auto">
                                        <Counter
                                            product={p}
                                            order={order}
                                            setOrder={setOrder}
                                        />
                                    </div>
                                </div>


                                <a
                                    style={{ color: 'red' }} onClick={() => {
                                        const updated = { ...order };
                                        delete updated[p.id];
                                        setOrder(updated);
                                    }}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </a>
                            </div>

                            {/* Second Line: Counter + Total */}

                        </li>
                    ))}
                </ul>
                <ul className="p-2 m-2">
                    {/* Subtotal */}
                    <li className="list-group-item d-flex py-1 justify-content-between align-items-center text-muted ">
                        <small >Subtotal:</small>
                        <small >
                            ${subtotal.toFixed(2)}
                        </small>
                    </li>

                    {/* Tax */}
                    <li className="list-group-item d-flex py-1 justify-content-between align-items-center text-muted">
                        <small >Tax (10%):</small>
                        <small >
                            ${tax.toFixed(2)}
                        </small>
                    </li>
                    <li className="list-group-item d-flex py-1 justify-content-between align-items-center text-muted">
                        <small>shipping :</small>
                        <small>
                            ${shipping.toFixed(2)}
                        </small>
                    </li>
                    {/* Total */}
                    <hr />
                    <li className="list-group-item d-flex py-1 justify-content-between align-items-center text-muted">
                        <small >Total:</small>
                        <small>
                            ${total.toFixed(2)}
                        </small>
                    </li>
                    <hr />
                    <li className="list-group-item d-flex py-1">
                        <a href="/cart" className="btn btn-dark w-100 text-center py-2">
                            Proceed to Checkout
                        </a>
                    </li>

                </ul>
            </div>
    );
}
