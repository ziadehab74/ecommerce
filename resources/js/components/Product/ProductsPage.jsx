import { useEffect, useState } from 'react';
import ProductList from './ProductList.jsx';
import SidebarFilters from './SideBarFilter.jsx';
import SearchInput from './SearchInput.jsx';
import Ordersummary from '../OrderSummary/OrderSummary.jsx';
import useProductFilter from '../Product/hooks/useProductFilter.js';
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

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // products per page

    const filteredProducts = useProductFilter(products, filters);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    useEffect(() => {
        axios.get(`${window.Laravel.appUrl}/api/products`)
            .then(res => setProducts(res.data.data))
            .catch(err => console.error('Fetch Error:', err));
    }, []);

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mt-5">
            <SidebarFilters filters={filters} setFilters={setFilters} products={products} />
            <div className="row">
                <div className={`bg-white rounded shadow p-2 col-12 ${Object.keys(order).length > 0 ? 'col-lg-9' : 'col-lg-12'} mb-4`}>
                    <SearchInput searchTerm={filters.searchTerm} onChange={term => setFilters({ ...filters, searchTerm: term })} />
                    <h5 className='p-2'>
                        Products <span className="text-muted">({filteredProducts.length} results found)</span>
                    </h5>
                    <ProductList products={paginatedProducts} order={order} setOrder={setOrder} />

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link background-black" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                            <button className="page-link background-black" onClick={() => handlePageChange(page)}>{page}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link background-black" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>

                {Object.keys(order).length > 0 && (
                    <div className="col-12 col-lg-3">
                        <div style={{ top: '80px' }}>
                            <Ordersummary order={order} products={products} setOrder={setOrder} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
``