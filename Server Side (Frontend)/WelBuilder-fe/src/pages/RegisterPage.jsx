import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import api from '../api/axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await api.post('/register', {
                email: email,
                password: password,
                name: name
            });

            const userData = response.data.data;

            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(response.data));

            navigate('/pages');
        } catch (err) {
            const message = error.response?.data?.message || 'Username or Password incorrect';
            setErrorMsg(message);
        }
    }

    return (
        <>
            <div class="auth-panel auth-panel--right">
                <div class="auth-card">

                    <div class="auth-card__header">
                        <h1 class="auth-card__title">Create Account</h1>
                        <p class="auth-card__subtitle">Start building your pages today</p>
                    </div>

                    <div class="auth-card__body">
                        <form onSubmit={handleRegister}>
                            <div class="form-group">
                                <label class="form-label" for="name">Full Name</label>
                                <input
                                    class={`form-input ${errorMsg ? 'form-input--error' : ''}`}
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    autocomplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="email">Email Address</label>
                                <input
                                    class={`form-input ${errorMsg ? 'form-input--error' : ''}`}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autocomplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errorMsg && (
                                    <span class="form-error">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6.5" cy="6.5" r="5.5" stroke="#c0392b" stroke-width="1.5" />
                                            <path d="M6.5 4v3" stroke="#c0392b" stroke-width="1.5" stroke-linecap="square" />
                                            <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                                        </svg>
                                        {errorMsg}
                                    </span>
                                )}
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="password">Password</label>
                                <input
                                    class={`form-input ${errorMsg ? 'form-input--error' : ''}`}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autocomplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errorMsg && (
                                    <span class="form-hint">{errorMsg}</span>
                                )}
                            </div>

                            <button class="btn btn--primary btn--full" type="submit">
                                Create Account
                            </button>
                        </form>
                    </div>
                    <div class="auth-card__footer">
                        <span>Already have an account?</span>
                        <Link to="/login">Login</Link>
                    </div>

                </div>
            </div>
        </>
    )
}