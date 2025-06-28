export default function Counter({ product, order, setOrder }) {
    const handleIncrement = (productId) => {
        setOrder(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    };

    const handleDecrement = (productId) => {
        setOrder(prev => {
            const current = prev[productId] || 0;
            if (current <= 0) return prev;
            const updated = { ...prev, [productId]: current - 1 };
            if (updated[productId] === 0) delete updated[productId];
            return updated;
        });
    };

    const quantity = order[product.id] || 0;

    return (
        <div className="d-flex mt-auto">
            <div className="border rounded d-flex align-items-center">
                <button
                    className="btn btn-light btn-sm"
                    onClick={() => handleDecrement(product.id)}
                >
                    −
                </button>
                <small className="mx-2">{quantity}</small>
                <button
                    className="btn btn-light btn-sm"
                    onClick={() => handleIncrement(product.id)}
                >
                    +
                </button>
            </div>
        </div>
    );
}
