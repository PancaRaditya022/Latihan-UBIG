import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardPage = () => {
    const [validation, setValidation] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const valRes = await api.get('/validations');
            const valData = valRes.data.validation || null;
            setValidation(valData);

            if (valData && valData.status === 'accepted') {
                const appRes = await api.get('/applications');
                setApplications(appRes.data.instalments || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;

    return (
        <>
            <Navbar />
            <main style={{ marginTop: '56px' }}>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>

                <div className="container">
                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Data Validation</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-header border-0">
                                        <h5 className="mb-0">Data Validation</h5>
                                    </div>

                                    {!validation ? (
                                        <div className="card-body">
                                            <Link to="/validation/request" className="btn btn-primary btn-block">
                                                + Request validation
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>
                                                            <span
                                                                className={`badge badge-${validation.status === 'accepted'
                                                                        ? 'success'
                                                                        : validation.status === 'rejected'
                                                                            ? 'danger'
                                                                            : 'info'
                                                                    }`}
                                                            >
                                                                {validation.status.charAt(0).toUpperCase() + validation.status.slice(1)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Job</th>
                                                        <td className="text-muted">{validation.job || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Income/Month</th>
                                                        <td className="text-muted">
                                                            {validation.income
                                                                ? `Rp. ${Number(validation.income).toLocaleString('id-ID')}`
                                                                : '-'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <td className="text-muted">{validation.validator?.name || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator Notes</th>
                                                        <td className="text-muted">{validation.validator_notes || '-'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="section-title text-muted">My Installment Cars</h4>
                                </div>
                                {validation?.status === 'accepted' && (
                                    <div className="col-md-4 text-right">
                                        <Link to="/instalment-cars" className="btn btn-primary btn-lg btn-block">
                                            + Add Installment Cars
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="section-body">
                            <div className="row mb-4">
                                {!validation || validation.status !== 'accepted' ? (
                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Your validation must be approved by validator to Installment Cars.
                                        </div>
                                    </div>
                                ) : applications.length === 0 ? (
                                    <div className="col-md-12">
                                        <div className="alert alert-info">
                                            You haven't applied for any installment cars yet.
                                        </div>
                                    </div>
                                ) : (
                                    applications.map((carItem) =>
                                        carItem.applications?.map((app, idx) => (
                                            <div className="col-md-6 mb-4" key={`${carItem.id}-${idx}`}>
                                                <div className="card card-default">
                                                    <div className="card-header border-0">
                                                        <h5 className="mb-0">{carItem.car}</h5>
                                                    </div>
                                                    <div className="card-body p-0">
                                                        <table className="table table-striped mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Description</th>
                                                                    <td className="text-muted">{carItem.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Price</th>
                                                                    <td className="text-muted">
                                                                        Rp. {Number(carItem.price).toLocaleString('id-ID')}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Installment</th>
                                                                    <td className="text-muted">
                                                                        {app.month} Months{' '}
                                                                        <span
                                                                            className={`badge badge-${app.apply_status === 'accepted'
                                                                                    ? 'success'
                                                                                    : app.apply_status === 'rejected'
                                                                                        ? 'danger'
                                                                                        : 'info'
                                                                                }`}
                                                                        >
                                                                            {app.apply_status.charAt(0).toUpperCase() + app.apply_status.slice(1)}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Notes</th>
                                                                    <td className="text-muted">{app.notes || '-'}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

=           <Footer />
        </>
    );
};

export default DashboardPage;