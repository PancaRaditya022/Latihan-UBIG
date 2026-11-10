import { useNavigate, Link } from "react-router-dom"
import api from '../api/axios';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            navigate('/login', { replace: true });
        }
    };

    const toLogin = async () => {
        try {
        } catch (e) {
        } finally {
            navigate('/login', { replace: true });
        }
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    Installment Cars
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ml-auto align-items-center">
                        {user.name ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link me-3">{user.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link"
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link text-white"
                                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                                    onClick={toLogin}
                                >
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar