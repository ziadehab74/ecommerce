import { useEffect, useState } from 'react';

export default function useCartData() {
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem('order')) || {};
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

        const fullCart = Object.entries(storedOrder).map(([productId, quantity]) => {
            const product = storedProducts.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return {
                ...product,
                quantity: quantity
            };
        }).filter(Boolean);

        setOrder(storedOrder);
        setProducts(storedProducts);
        setCartItems(fullCart);
    }, []);

    return { order, setOrder, products, cartItems };
}
