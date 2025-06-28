import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AuthButton() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

    // Listen for storage changes (e.g. login from another tab or logout)
    useEffect(() => {
        const syncLoginState = () => setIsLoggedIn(!!localStorage.getItem('user'));
        window.addEventListener('storage', syncLoginState);
        return () => window.removeEventListener('storage', syncLoginState);
    }, []);

    // Optional: also check on mount in case something changed
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('user'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false); // manually update state
        navigate('/login');
    };

    return isLoggedIn ? (
        <button className="btn background-black text-white" onClick={handleLogout}>
            Logout
        </button>
    ) : (
        <Link to="/login" className="btn background-black text-white">
            Login
        </Link>
    );
}
