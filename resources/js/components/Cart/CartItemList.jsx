import CartItem from './CartItem.jsx';

export default function CartItemList({ items, order, setOrder }) {
    return (
        <div className="list-group">
            {items.map((item, index) => (
                <CartItem key={index} item={item} order={order} setOrder={setOrder} />
            ))}
        </div>
    );
}
