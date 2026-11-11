import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function JobVacancyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vacancy, setVacancy] = useState(null);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
            return;
        }
        fetchVacancyDetail();
    }, [id, user.token, navigate]);

    const fetchVacancyDetail = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/job_vacancies/${id}?token=${user.token}`);
            const vacancyData = res.data.vacancy || res.data || null;
            setVacancy(vacancyData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch job vacancy detail');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (positionId) => {
        if (positionId === undefined || positionId === null) return;

        if (selectedPositions.includes(positionId)) {
            setSelectedPositions(selectedPositions.filter((posId) => posId !== positionId));
        } else {
            setSelectedPositions([...selectedPositions, positionId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (selectedPositions.length === 0) {
            alert('Please select at least one position');
            return;
        }

        try {
            setSubmitting(true);
            
            const payload = {
                vacancy_id: parseInt(id, 10),
                positions: selectedPositions,
                notes: notes
            };

            const res = await api.post(`/applications?token=${user.token}`, payload);

            if (res.status === 200 || res.status === 201) {
                alert('Applying for job successful');
                navigate('/job-vacancies');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply for this job');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center my-5">Loading vacancy details...</div>;
    if (!vacancy) return <div className="text-center my-5 text-danger">Vacancy not found</div>;

    return (
        <>
            <Navbar />

            <main style={{ marginTop: '56px' }}>
                <header className="jumbotron">
                    <div className="container text-center">
                        <div>
                            <h1 className="display-4">{vacancy.company}</h1>
                            <span className="text-muted">{vacancy.address}</span>
                        </div>
                    </div>
                </header>

                <div className="container mb-5">
                    {error && (
                        <div className="alert alert-danger mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <h3>Description</h3>
                                    <p className="text-muted">{vacancy.description || 'No description available'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h3>Select position</h3>
                                    </div>
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th width="40" className="text-center">#</th>
                                                <th>Position</th>
                                                <th>Capacity</th>
                                                <th>Application / Max</th>
                                                <th width="200" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vacancy.available_position?.map((pos, index) => {
                                                const posId = pos.id ?? pos.position_id;
                                                const isFull = (pos.apply_count ?? 0) >= (pos.apply_capacity ?? pos.capacity);

                                                return (
                                                    <tr key={posId ?? index} className={isFull ? 'table-warning' : ''}>
                                                        <td className="text-center">
                                                            <input 
                                                                type="checkbox"
                                                                disabled={isFull}
                                                                checked={selectedPositions.includes(posId)}
                                                                onChange={() => handleCheckboxChange(posId)}
                                                            />
                                                        </td>
                                                        <td>{pos.position}</td>
                                                        <td>{pos.capacity}</td>
                                                        <td>{pos.apply_count ?? 0}/{pos.apply_capacity ?? pos.capacity}</td>
                                                        
                                                        {index === 0 && (
                                                            <td 
                                                                rowSpan={vacancy.available_position.length} 
                                                                style={{ verticalAlign: 'middle' }} 
                                                                className="text-center"
                                                            >
                                                                <button 
                                                                    type="submit" 
                                                                    className="btn btn-primary btn-lg btn-block" 
                                                                    disabled={submitting || selectedPositions.length === 0}
                                                                >
                                                                    {submitting ? 'Applying...' : 'Apply for this job'}
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0 font-weight-bold">Notes for Company</label>
                                    </div>
                                    <textarea 
                                        className="form-control" 
                                        cols="30" 
                                        rows="6" 
                                        placeholder="Explain why you should be accepted"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}