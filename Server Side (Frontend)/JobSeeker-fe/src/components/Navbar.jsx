import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            if (user.token) {
                await api.post(`/auth/logout?token=${user.token}`);
            }
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('user');
            alert('Logout success');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    Job Seekers Platform
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
                    <ul className="navbar-nav ml-auto">
                        {user.token ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        {user.name}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={handleLogout} 
                                        className="btn btn-link nav-link" 
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}