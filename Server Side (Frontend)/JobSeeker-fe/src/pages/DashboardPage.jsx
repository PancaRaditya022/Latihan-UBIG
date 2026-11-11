import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
    const [job, setJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const categoryName = {
        1: 'Computing and ICT',
        2: 'Construction and building',
        3: 'Animals, land and environment',
        4: 'Design, arts and crafts',
        5: 'Design, arts and crafts'
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!storedUser.token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const jobRes = await api.get(`/validations?token=${storedUser.token}`);
                const jobData = jobRes.data.validation || jobRes.data || null;
                setJob(jobData);

                if (jobData && jobData.status === 'accepted') {
                    const appRes = await api.get(`/applications?token=${storedUser.token}`);
                    const appData = appRes.data.vacancies || appRes.data || [];
                    setApplications(appData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

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
                                    <div className="card-header">
                                        <h5 className="mb-0">Data Validation</h5>
                                    </div>

                                    {!job ? (
                                        <div className="card-body">
                                            <Link to="/request-validation" className="btn btn-primary btn-block">
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
                                                            <span className={`badge badge-${
                                                                job.status === 'accepted'
                                                                    ? 'success'
                                                                    : job.status === 'rejected'
                                                                        ? 'danger'
                                                                        : 'info'
                                                            }`}>
                                                                {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : '-'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Job Category</th>
                                                        <td className="text-muted">{categoryName[job.job_category_id] || job.job_category_id || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Job Position</th>
                                                        <td className="text-muted">{job.job_position || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Reason Accepted</th>
                                                        <td className="text-muted">{job.reason_accepted || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <td className="text-muted">{job.validator?.name || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator Notes</th>
                                                        <td className="text-muted">{job.validator_notes || '-'}</td>
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
                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="section-title text-muted">My Job Applications</h4>
                                </div>
                                {job?.status === 'accepted' && (
                                    <div className="col-md-4">
                                        <Link to="/job-vacancies" className="btn btn-primary btn-lg btn-block">
                                            + Add Job Applications
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="section-body">
                            <div className="row mb-4">
                                {!job || job.status !== 'accepted' ? (
                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Your validation must be approved by validator to applying job.
                                        </div>
                                    </div>
                                ) : applications.length === 0 ? (
                                    <div className="col-md-12">
                                        <div className="alert alert-info">
                                            You haven't applied for any job yet.
                                        </div>
                                    </div>
                                ) : (
                                    applications.map((vacancy) => (
                                        <div className="col-md-6 mb-4" key={vacancy.id}>
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">{vacancy.company}</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th>Address</th>
                                                                <td className="text-muted">{vacancy.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Position</th>
                                                                <td className="text-muted">
                                                                    <ul className="pl-3 mb-0">
                                                                        {vacancy.position?.map((pos, idx) => (
                                                                            <li key={idx}>
                                                                                {pos.position}{' '}
                                                                                <span className={`badge badge-${
                                                                                    pos.apply_status === 'accepted'
                                                                                        ? 'success'
                                                                                        : pos.apply_status === 'rejected'
                                                                                            ? 'danger'
                                                                                            : 'info'
                                                                                }`}>
                                                                                    {pos.apply_status ? pos.apply_status.charAt(0).toUpperCase() + pos.apply_status.slice(1) : '-'}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Apply Date</th>
                                                                <td className="text-muted">{formatDate(vacancy.date)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Notes</th>
                                                                <td className="text-muted">
                                                                    {vacancy.position?.[0]?.notes || '-'}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}