import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function JobVacanciesPage() {
    const [vacancies, setVacancies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user.token, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const vacanciesRes = await api.get(`/job_vacancies?token=${user.token}`);
            const vacancyList = vacanciesRes.data.vacancies || vacanciesRes.data || [];
            setVacancies(vacancyList);

            const appRes = await api.get(`/applications?token=${user.token}`);
            const appList = appRes.data.vacancies || appRes.data || [];
            setApplications(appList);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch job vacancies');
        } finally {
            setLoading(false);
        }
    };

    const isApplied = (vacancyId) => {
        return applications.length > 0 || applications.some((app) => app.id === vacancyId);
    };

    if (loading) return <div className="text-center my-5">Loading job vacancies...</div>;

    return (
        <>
            <Navbar />

            <main style={{ marginTop: '56px' }}>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Job Vacancies</h1>
                    </div>
                </header>

                <div className="container mb-5">
                    {error && (
                        <div className="alert alert-danger mb-4">
                            {error}
                        </div>
                    )}

                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">
                            List of Job Vacancies
                        </h4>
                    </div>

                    <div className="section-body">
                        {vacancies.length === 0 ? (
                            <div className="alert alert-info">
                                No job vacancies available for your category.
                            </div>
                        ) : (
                            vacancies.map((vacancy) => {
                                const applied = isApplied(vacancy.id);

                                return (
                                    <article 
                                        className={`spot ${applied ? 'unavailable' : ''} mb-3`} 
                                        key={vacancy.id}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <h5 className="text-primary">{vacancy.company}</h5>
                                                <span className="text-muted">{vacancy.address}</span>
                                            </div>

                                            <div className="col-md-4">
                                                <h5>Available Position (Capacity)</h5>
                                                <span className="text-muted">
                                                    {vacancy.available_position?.map((pos, idx) => (
                                                        <span key={idx}>
                                                            {pos.position} ({pos.capacity})
                                                            {idx < vacancy.available_position.length - 1 ? ', ' : ''}
                                                        </span>
                                                    )) || vacancy.position || '-'}
                                                </span>
                                            </div>

                                            <div className="col-md-3">
                                                {applied ? (
                                                    <div className="bg-success text-white text-center p-2 rounded">
                                                        Vacancies have been submitted
                                                    </div>
                                                ) : (
                                                    <Link 
                                                        to={`/job-vacancies/${vacancy.id}`} 
                                                        className="btn btn-danger btn-lg btn-block"
                                                    >
                                                        Detail / Apply
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}