import { useEffect, useState } from 'react';
import Ordersummary from './ordersummary.jsx';
import Counter from './counter.jsx';
import axios from 'axios';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState(() => {
        const savedCart = localStorage.getItem('order');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, [products]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);



    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // if (loading) return <div className="container mt-5"><img src="" alt="" /></div>;

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Products List */}
                <div className={`col-md-${Object.keys(order).length > 0 ? '9' : '12'} bg-white p-4 rounded-3`}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or category..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <h4 className="fw-semibold mb-3">casual</h4>
                    <div className="row">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => {
                                const quantity = order[product.id] || 0;
                                return (
                                    <div className="col-md-6 col-lg-4 mb-3 col-sm-6" key={index}>
                                        <div className={`card h-100 ${quantity > 0 ? 'border-success shadow' : ''}`}>
                                            <div className="card-body d-flex flex-column">
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="img-fluid mb-3"
                                                    style={{ maxHeight: '100px', objectFit: 'cover' }}
                                                />

                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <small className="card-title fw-semibold mb-0">{product.name}</small>
                                                    <small className="badge text-bg-light">{product.category}</small>
                                                </div>

                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="card-text mb-0"><strong>Stock:</strong> {product.stock}</p>
                                                    <p className="card-text mb-0"><strong>Price:</strong> ${product.price}</p>
                                                </div>

                                                {/* Quantity Counter */}
                                                <Counter
                                                    product={product}
                                                    order={order}
                                                    setOrder={setOrder}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center mt-4">No products found.</div>
                        )}
                    </div>
                </div>
                <div className="col-md-3">

                    {/* Order Summary */}
                    <Ordersummary
                        order={order}
                        products={products}
                        setOrder={setOrder}
                    />

                </div>
            </div>
        </div>
    );
}
