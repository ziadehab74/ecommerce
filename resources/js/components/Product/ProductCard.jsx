import Counter from '../Counter/Counter.jsx';

export default function ProductCard({ product, quantity, order, setOrder }) {
    return (
        <div className={`card h-100 ${quantity > 0 ? 'border-success shadow-sm' : ''}`}>
            <div className="card-body d-flex flex-column">
                <img src={product.image_url} alt={product.name} className="img-fluid mb-3" style={{ maxHeight: '150px', objectFit: 'contain' }} />
                <div className="d-flex justify-content-between mb-2">
                    <small className="fw-semibold">{product.name}</small>
                    <small className="badge text-bg-light">{product.category}</small>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <small className="fw-bold">${product.price}</small>
                    <small className="text-muted">Stock: {product.stock}</small>
                </div>
                <Counter product={product} order={order} setOrder={setOrder} />
            </div>
        </div>
    );
}
