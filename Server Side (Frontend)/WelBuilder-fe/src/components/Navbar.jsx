import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const stored = JSON.parse(localStorage.getItem('user'));
    const user = stored?.data || stored;

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <Link to="/pages" className="navbar__brand">
                WelBuilder
            </Link>
            <div className="navbar__actions">
                <button className="navbar__menu-toggle" type="button" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button className="btn btn--ghost btn--sm" type="button">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M1 12c0-2.485 2.462-4.5 5.5-4.5S12 9.515 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                    {user?.name || 'User'}
                </button>
                <button className="btn btn--ghost btn--sm" type="button" onClick={handleLogout}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1h3v1.5L9.5 4h2V11H1.5V4h2L5 2.5V1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M9 7.5L7 9.5l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    );
}