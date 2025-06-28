import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductsPage from './components/Product/ProductsPage.jsx';
import CartPage from './components/Cart/CartPage.jsx';
import LoginPage from './components/Login/Login.jsx';

function App() {
    return (
        <Router>
            <div style={{ fontFamily: 'Roboto, sans-serif' }} className="bg-light">
                <Header />
                <Navbar />

                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
