import Counter from '../Counter';

export default function CartItem({ item, order, setOrder }) {
    return (
        <div className="list-group-item d-flex">
            <div className="col-md-4 p-2">
                <img src={item.image} alt={item.name} width="100px" />
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-between">
                <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <small>Quantity: {item.quantity}</small>
                    <Counter product={item} order={order} setOrder={setOrder} />
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    );
}
