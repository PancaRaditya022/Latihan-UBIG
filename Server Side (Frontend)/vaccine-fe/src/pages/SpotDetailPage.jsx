import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SpotDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];

    const [spot, setSpot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [vaccinations, setVaccinations] = useState([]);
    const [myConsultation, setMyConsultation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const userToken = user.token || token;

    useEffect(() => {
        fetchSpotDetail();
    }, [selectedDate, id]);

    const fetchSpotDetail = async () => {
        try {
            setLoading(true);
            setErrorMsg('');

            const res = await api.get(`/spots/${id}?token=${userToken}&date=${selectedDate}`);
            const data = res.data.spot || res.data;
            setSpot(data);
            setVaccinations(res.data.vaccinations || data.vaccinations || []);

            const consulRes = await api.get(`/consultations?token=${userToken}`);
            setMyConsultation(consulRes.data.consultation || consulRes.data);
        } catch (err) {
            console.error('Error fetching spot detail:', err);
            setErrorMsg(err.response?.data?.message || 'Failed to load spot detail');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setErrorMsg('');

        if (!selectedSlot) {
            setErrorMsg('Please select a queue slot for your vaccination.');
            return;
        }

        try {
            setSubmitting(true);
            await api.post(`/vaccinations?token=${userToken}`, {
                date: selectedDate,
                spot_id: id,
                slot: selectedSlot,
                queue: selectedSlot
            });

            alert('Register vaccination successful');
            navigate('/dashboard');
        } catch (err) {
            console.error('Registration failed:', err);
            setErrorMsg(err.response?.data?.message || 'Failed to register vaccination');
        } finally {
            setSubmitting(false);
        }
    };

    const capacity = spot?.capacity || 15;
    const capacityPerSession = Math.ceil(capacity / 3);

    const sessions = [
        { id: 1, title: 'Session 1', time: '09:00 - 11:00' },
        { id: 2, title: 'Session 2', time: '13:00 - 15:00' },
        { id: 3, title: 'Session 3', time: '15:00 - 17:00' },
    ];

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    <p>Loading spot details...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4">{spot?.name || 'Vaccination Spot'}</h1>
                            <span className="text-muted">{spot?.address}</span>
                        </div>
                        <button
                            onClick={handleRegister}
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Registering...' : 'Register vaccination'}
                        </button>
                    </div>
                </header>

                <div className="container">
                    {errorMsg && <div className="alert alert-danger mb-4">{errorMsg}</div>}

                    <div className="row mb-3">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="vaccination-date">Select vaccination date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="vaccination-date"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedSlot(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        {sessions.map((session) => (
                            <div className="col-md-4" key={session.id}>
                                <div className="card card-default">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h4>{session.title}</h4>
                                            <span className="text-muted">{session.time}</span>
                                        </div>
                                        <div>
                                            <div className="row">
                                                {Array.from({ length: capacityPerSession }).map((_, index) => {
                                                    const queueNumber = (session.id - 1) * capacityPerSession + index + 1;

                                                    const filledVaccination = vaccinations[queueNumber - 1];

                                                    const currentSocietyId = Number(myConsultation?.society_id || user?.id || 0);
                                                    const filledSocietyId = Number(filledVaccination?.society_id || filledVaccination?.user_id || 0);

                                                    const isMySlot = filledVaccination && (
                                                        filledSocietyId === currentSocietyId ||
                                                        filledVaccination.is_mine === true
                                                    );

                                                    const isSelectedByMe = selectedSlot === queueNumber;

                                                    let slotStyle = {};
                                                    let slotClassName = 'slot text-center py-2 border rounded ';

                                                    if (isMySlot || isSelectedByMe) {
                                                        slotClassName += 'bg-primary text-white border-primary';
                                                    } else if (filledVaccination) {
                                                        slotClassName += 'bg-white text-success';
                                                        slotStyle = { borderColor: '#28a745', borderWidth: '20px', borderStyle: 'solid' };
                                                    } else {
                                                        slotClassName += 'bg-light text-muted border-secondary';
                                                    }

                                                    return (
                                                        <div className="col-4 mb-4" key={index}>
                                                            <div
                                                                className={slotClassName}
                                                                style={{
                                                                    cursor: !filledVaccination ? 'pointer' : 'default',
                                                                    ...slotStyle
                                                                }}
                                                                onClick={() => {
                                                                    if (!filledVaccination) {
                                                                        setSelectedSlot(queueNumber);
                                                                    }
                                                                }}
                                                            >
                                                                #{queueNumber}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SpotDetailPage;