import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // ✅ Import React Router navigation
import axios from "axios";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ Initialize navigation

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.get(`${window.Laravel.appUrl}/sanctum/csrf-cookie`, { withCredentials: true });

            const response = await axios.post(`${window.Laravel.appUrl}/api/login`, {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);

            // ✅ Redirect after login (SPA-style)
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="bg-white p-4 rounded-3 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center fw-semibold">Welcome back</h2>
                <p className="text-center text-muted mb-4">Please enter your details to sign in</p>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                top: '38px',
                                right: '10px',
                                cursor: 'pointer',
                                color: '#6c757d'
                            }}
                        ></i>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-dark" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
