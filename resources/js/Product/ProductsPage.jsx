import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import SidebarFilters from './SidebarFilters';
import SearchInput from './SearchInput';
import Ordersummary from './Ordersummary';
import useProductFilter from '../hooks/useProductFilter';
import axios from 'axios';

export default function ProductsPage() {
    const MIN = 0, MAX = 1000;
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState(() => JSON.parse(localStorage.getItem('order')) || []);
    const [filters, setFilters] = useState({
        searchTerm: '',
        priceRange: [MIN, MAX],
        category: []
    });

    const filteredProducts = useProductFilter(products, filters);

    useEffect(() => {
        axios.get(`${window.Laravel.appUrl}/api/products`)
            .then(res => setProducts(res.data.data))
            .catch(err => console.error('Fetch Error:', err));
    }, []);

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return (
        <div className="container mt-5">
            <SidebarFilters filters={filters} setFilters={setFilters} products={products} />
            <div className="row">
                <div className={`col-12 ${Object.keys(order).length > 0 ? 'col-lg-9' : 'col-lg-12'} mb-4`}>
                    <SearchInput searchTerm={filters.searchTerm} onChange={term => setFilters({ ...filters, searchTerm: term })} />
                    <ProductList products={filteredProducts} order={order} setOrder={setOrder} />
                </div>
                {Object.keys(order).length > 0 && (
                    <div className="col-12 col-lg-3">
                        <div className="sticky-top" style={{ top: '80px' }}>
                            <Ordersummary order={order} products={products} setOrder={setOrder} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
