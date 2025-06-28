import Ordersummary from '../Ordersummary.jsx';
import CartItemList from './CartItemList.jsx';
import useCartData from '../../hooks/useCartData.js';

export default function CartPage() {
    const { order, setOrder, products, cartItems } = useCartData();

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        <CartItemList items={cartItems} order={order} setOrder={setOrder} />
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
    );
}
