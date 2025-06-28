import { useEffect, useState } from 'react';
import Ordersummary from './ordersummary.jsx';
import Counter from './counter.jsx';
import axios from 'axios';
import { Range } from 'react-range';

export default function Products() {
    const MIN = 0;
    const MAX = 1000;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [selectedCategory, setSelectedCategory] = useState([]); // Changed to array
    const [showSidebar, setShowSidebar] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({
        searchTerm: '',
        priceRange: [MIN, MAX],
        category: []
    });

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
        axios.get(`${window.Laravel.appUrl}/api/products`)
            .then(response => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const categories = [...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase());
        const matchesCategory =
            appliedFilters.category.length === 0 ||
            appliedFilters.category.includes(product.category);
        const matchesPrice =
            product.price >= appliedFilters.priceRange[0] &&
            product.price <= appliedFilters.priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="container mt-5">
            {/* Sidebar Toggle Button */}
            <button
                className="btn btn-outline-dark position-fixed top-50 start-0 translate-middle-y z-3"
                style={{ zIndex: 1050 }}
                onClick={() => setShowSidebar(!showSidebar)}
            >
                Filters
            </button>

            {/* Sidebar */}
            <div
                className="position-fixed top-0 start-0 h-100 bg-white shadow p-4 overflow-auto"
                style={{
                    width: '300px',
                    zIndex: 1040,
                    transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Filters</h5>
                    <button className="btn-close" onClick={() => setShowSidebar(false)}></button>
                </div>

                {/* Price Range Slider */}
                <div className="mb-3">
                    <label className="form-label d-block">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Range
                        step={10}
                        min={MIN}
                        max={MAX}
                        values={priceRange}
                        onChange={(values) => setPriceRange(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#d3d4d5',
                                    borderRadius: '3px',
                                    marginTop: '10px',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        height: '6px',
                                        background: 'black',
                                        borderRadius: '3px',
                                        left: `${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
                                        width: `${((priceRange[1] - priceRange[0]) / (MAX - MIN)) * 100}%`,
                                    }}
                                />
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '16px',
                                    width: '16px',
                                    backgroundColor: 'black',
                                    borderRadius: '50%',
                                    outline: 'none',
                                }}
                            />
                        )}
                    />
                </div>

                {/* Category Filters */}
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <div>
                        {categories.map((cat, i) => (
                            <div key={i} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    style={{ accentColor: 'black' }}
                                    id={`cat-${i}`}
                                    value={cat}
                                    checked={selectedCategory.includes(cat)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectedCategory(prev =>
                                            checked
                                                ? [...prev, cat]
                                                : prev.filter(c => c !== cat)
                                        );
                                    }}
                                />

                                <label className="form-check-label" htmlFor={`cat-${i}`}>
                                    {cat}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="d-flex gap-2">
                    <button
                        className="btn background-black w-100"
                        onClick={() => {
                            setAppliedFilters({
                                searchTerm,
                                priceRange,
                                category: selectedCategory,
                            });
                            setShowSidebar(false);
                        }}
                    >
                        Apply
                    </button>
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory([]);
                            setPriceRange([MIN, MAX]);
                            setAppliedFilters({
                                searchTerm: '',
                                priceRange: [MIN, MAX],
                                category: [],
                            });
                            setShowSidebar(false);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Product Grid & Order Summary */}
            <div className="row">
                {/* Products List */}
                <div className={`col-12 ${Object.keys(order).length > 0 ? 'col-lg-9' : 'col-lg-12'} mb-4`}>
                    <div className="bg-white p-4 rounded-3 shadow-sm">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={e => {
                                    const value = e.target.value;
                                    setSearchTerm(value);
                                    setAppliedFilters(prev => ({
                                        ...prev,
                                        searchTerm: value,
                                    }));
                                }}
                            />
                        </div>

                        <h4 className="fw-semibold mb-3">Products</h4>
                        <div className="row">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => {
                                    const quantity = order[product.id] || 0;
                                    return (
                                        <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
                                            <div className={`card h-100 ${quantity > 0 ? 'border-success shadow-sm' : ''}`}>
                                                <div className="card-body d-flex flex-column">
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="img-fluid mb-3"
                                                        style={{ maxHeight: '150px', objectFit: 'contain' }}
                                                    />
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <small className="card-title fw-semibold mb-0">{product.name}</small>
                                                        <small className="badge text-bg-light text-muted">{product.category}</small>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <small className="fw-bold"> ${product.price}</small>
                                                        <small className="text-muted"><small>Stock:</small> {product.stock}</small>
                                                    </div>
                                                    <Counter product={product} order={order} setOrder={setOrder} />
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
                </div>

                {/* Order Summary */}
                {Object.keys(order).length > 0 && (
                    <div className="col-12 col-lg-3">
                        <div className="sticky-top" style={{ top: '80px' }}>
                            <Ordersummary
                                order={order}
                                products={products}
                                setOrder={setOrder}
                                cart={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
