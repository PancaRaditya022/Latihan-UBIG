import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const [idCardNumber, setIdCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await api.post('/auth/login', {
                id_card_number: idCardNumber,
                password: password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));

            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMsg('ID Card Number or Password incorrect');
            } else {
                setErrorMsg('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Installment Cars</h1>
                    </div>
                </header>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            {errorMsg && (
                                <div className="alert alert-danger" role='alert'>{errorMsg}</div>
                            )}
                            <form className="card card-default" onSubmit={handleLogin}>
                                <div className="card-header">
                                    <h4 className="mb-0">Login</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">ID Card Number</div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={idCardNumber}
                                                onChange={(e) => setIdCardNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8">
                                            <button className="btn btn-primary" type="submit">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default LoginPage;