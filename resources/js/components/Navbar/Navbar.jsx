import { Link } from 'react-router-dom';
import AuthButton from '../../AuthButton.jsx';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid px-3">
                {/* ✅ Logo */}
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <img src="/assets/img/izam.png" alt="Logo" style={{ height: '50px' }} />
                </Link>

                {/* ✅ Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* ✅ Collapsible Content */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link text-dark">Products</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark btn-sm ms-lg-2 mt-2 mt-lg-0">Sell Your Product</button>
                        </li>
                    </ul>
                </div>

                {/* ✅ Right Side: Cart + Auth (Always visible) */}
                <div className="d-flex align-items-center gap-3">
                    <Link to="/cart" className="text-dark position-relative">
                        <i className="bi bi-cart-fill" style={{ fontSize: '1.4rem' }}></i>
                    </Link>
                    <AuthButton />
                </div>
            </div>
        </nav>
    );
}
