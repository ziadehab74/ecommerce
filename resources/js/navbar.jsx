
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div
            className="alert alert-white alert-dismissible fade show mb-0 rounded-0 py-1"
            role="alert"
            style={{ backgroundColor: 'white' }}
        >
            <div className="container d-flex justify-content-between align-items-center">
                {/* ✅ Left Side */}
                <div className="d-flex align-items-center gap-3">
                    <img src="/assets/img/izam.png" alt="Logo" style={{ height: '60px' }} />
                    <Link to="/products" className="text-dark text-decoration-none">Products</Link>
                    <button className="btn background-black text-white">Sell Your Product</button>
                </div>

                {/* ✅ Right Side */}
                <div className="d-flex align-items-center gap-4">
                   <a href="/cart"><i className="bi bi-cart-fill" style={{ fontSize: '1.5rem', color: 'black' }}></i></a> 
                    <Link to="/login" className="btn background-black text-white">Login</Link>

                </div>
            </div>
        </div>
    );
}

