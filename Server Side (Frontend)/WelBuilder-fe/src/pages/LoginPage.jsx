import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import api from '../api/axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            });

            const userData = response.data.data;

            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(response.data));

            navigate('/pages');
        } catch (error) {
            const message = error.response?.data?.message || 'Username or password incorrect';
            setErrorMsg(message);
        }
    }

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if(token || user) {
        return <Navigate to='/pages' />
    }

    return (
        <>
            <div className="auth-panel">
                <div className="auth-card">

                    <div className="auth-card__header">
                        <h1 className="auth-card__title">Sign In</h1>
                        <p className="auth-card__subtitle">Enter your credentials to continue</p>
                    </div>

                    <div className="auth-card__body">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    className={`form-input ${errorMsg ? 'form-input--error' : ''}`}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errorMsg) setErrorMsg('');
                                    }}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    className={`form-input ${errorMsg ? 'form-input--error' : ''}`}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errorMsg) setErrorMsg('');
                                    }}
                                    required
                                />
                                {errorMsg && (
                                    <span className="form-error">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6.5" cy="6.5" r="5.5" stroke="#c0392b" strokeWidth="1.5" />
                                            <path d="M6.5 4v3" stroke="#c0392b" strokeWidth="1.5" strokeLinecap="square" />
                                            <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                                        </svg>
                                        {errorMsg}
                                    </span>
                                )}
                            </div>

                            <button className="btn btn--primary btn--full" type="submit">
                                Sign In
                            </button>

                        </form>
                    </div>

                    <div className="auth-card__footer">
                        <span>Don't have an account?</span>
                        <Link to='/register'>Create One</Link>
                    </div>

                </div>
            </div>
        </>
    )
}