import { useState, useEffect } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    // Prevent scroll on mount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // Restore on unmount
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ overflow: 'hidden' }}>
            <div className="bg-white p-4 rounded-3 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center fw-semibold">Welcome back</h2>   
                <p className="text-center text-muted mb-4">Please enter your details to sign in</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
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
                        <button type="submit" className="btn background-black">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
