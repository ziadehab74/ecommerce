import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Header from './header.jsx';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import Products from './products.jsx';
import Cart from './cart.jsx';

function App() {
    return (
        <Router>
            <div style={{ fontFamily: 'Roboto, sans-serif' }} className='bg-light'>
                <Header />
                <Navbar />

                {/* SPA Routes */}
                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} /> {/* 👈 redirect */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
