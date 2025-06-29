import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { OrderProvider } from './contexts/OrderContext.jsx';

import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductsPage from './components/Product/ProductsPage.jsx';
import CartPage from './components/Cart/CartPage.jsx';
import LoginPage from './components/Login/Login.jsx';

export default function App() {
    return (
        <Router>
            <OrderProvider>

                <div className="bg-light min-vh-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Header />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/products" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </div>
            </OrderProvider>

        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
