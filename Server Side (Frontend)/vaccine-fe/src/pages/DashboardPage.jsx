import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardPage = () => {
    const [consultation, setConsultation] = useState(null);
    const [vaccinations, setVaccinations] = useState({ first: null, second: null });
    const [loading, setLoading] = useState(true);
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

            const consulRes = await api.get(`/consultations?token=${user.token}`);
            const consulData = consulRes.data.consultation || consulRes.data || null;
            setConsultation(consulData);

            if (consulData && consulData.status === 'accepted') {
                const vaccineRes = await api.get(`/vaccinations?token=${user.token}`);
                
                const vacData = vaccineRes.data.vaccinations || vaccineRes.data || {};
                
                let first = null;
                let second = null;

                if (Array.isArray(vacData)) {
                    first = vacData.find(v => v.dose === 1 || v.dose === '1') || null;
                    second = vacData.find(v => v.dose === 2 || v.dose === '2') || null;
                } else {
                    first = vacData.first || null;
                    second = vacData.second || null;
                }

                setVaccinations({ first, second });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderBadge = (status) => {
        if (!status) return null;
        const normalized = status.toLowerCase();
        if (normalized === 'accepted' || normalized === 'vaccinated' || normalized === 'done') {
            return <span className="badge badge-primary">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
        }
        if (normalized === 'pending' || normalized === 'registered') {
            return <span className="badge badge-info">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
        }
        if (normalized === 'declined' || normalized === 'rejected') {
            return <span className="badge badge-danger">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
        }
        return <span className="badge badge-secondary">{status}</span>;
    };

    const renderVaccinationCard = (title, vaccineData, canRegister) => {
        if (!vaccineData) {
            if (canRegister) {
                return (
                    <div className="card card-default">
                        <div className="card-header border-0">
                            <h5 className="mb-0">{title}</h5>
                        </div>
                        <div className="card-body">
                            <Link to="/register-vaccination">+ Register vaccination</Link>
                        </div>
                    </div>
                );
            }
            return null;
        }

        return (
            <div className="card card-default">
                <div className="card-header border-0">
                    <h5 className="mb-0">{title}</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped mb-0">
                        <tbody>
                            <tr>
                                <th>Status</th>
                                <td>{renderBadge(vaccineData.status || (vaccineData.vaccine ? 'Vaccinated' : 'Registered'))}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td className="text-muted">{vaccineData.date || vaccineData.vaccination_date || '-'}</td>
                            </tr>
                            <tr>
                                <th>Spot</th>
                                <td className="text-muted">{vaccineData.spot?.name || vaccineData.spot || '-'}</td>
                            </tr>
                            <tr>
                                <th>Vaccine</th>
                                <td className="text-muted">{vaccineData.vaccine?.name || vaccineData.vaccine || '-'}</td>
                            </tr>
                            <tr>
                                <th>Vaccinator</th>
                                <td className="text-muted">{vaccineData.doctor?.name || vaccineData.vaccinator || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    <p>Loading dashboard...</p>
                </div>
            </>
        );
    }

    const isAccepted = consultation?.status === 'accepted';
    
    const firstFinished = vaccinations.first && (
        vaccinations.first.status === 'vaccinated' || 
        vaccinations.first.status === 'done' || 
        vaccinations.first.vaccine ||
        vaccinations.first.date ||
        vaccinations.first.vaccination_date
    );

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>

                <div className="container">
                    <section className="consultation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Consultation</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                {!consultation ? (
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h5 className="mb-0">Consultation</h5>
                                        </div>
                                        <div className="card-body">
                                            <Link to="/request-consultation">+ Request consultation</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Consultation</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{renderBadge(consultation.status)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Disease History</th>
                                                        <td className="text-muted">{consultation.disease_history || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Current Symptoms</th>
                                                        <td className="text-muted">{consultation.current_symptoms || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Doctor Name</th>
                                                        <td className="text-muted">{consultation.doctor?.name || consultation.doctor_name || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Doctor Notes</th>
                                                        <td className="text-muted">{consultation.doctor_notes || '-'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="consultation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">Vaccinations</h4>
                        </div>
                        <div className="section-body">
                            {!isAccepted ? (
                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Your consultation must be approved by doctor to get the vaccine.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="row mb-4">
                                        <div className="col-md-4">
                                            {renderVaccinationCard("First Vaccination", vaccinations.first, true)}
                                        </div>
                                    </div>

                                    {firstFinished && (
                                        <div className="row">
                                            <div className="col-md-4">
                                                {renderVaccinationCard("Second Vaccination", vaccinations.second, true)}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DashboardPage;