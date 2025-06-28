import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, order, setOrder }) {
    if (!products.length) return <div className="text-center mt-4">No products found.</div>;

    return (
        <div className="row ">
            {products.map((product, index) => (
                <div className="col-12 col-sm-6 col-md-4 mb-4 " key={index}>
                    <ProductCard
                        product={product}
                        quantity={order[product.id] || 0}
                        order={order}
                        setOrder={setOrder}
                    />
                </div>

            ))}
        </div>
    );
}
