// src/contexts/OrderContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [order, setOrder] = useState(() => {
        const saved = localStorage.getItem('order');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => useContext(OrderContext);
