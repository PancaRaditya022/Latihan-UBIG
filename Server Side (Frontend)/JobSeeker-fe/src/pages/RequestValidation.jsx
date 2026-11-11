import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RequestValidationPage() {
    const [jobCategoryId, setJobCategoryId] = useState('1');
    const [jobPosition, setJobPosition] = useState('');
    const [hasWorkExperience, setHasWorkExperience] = useState('yes');
    const [workExperience, setWorkExperience] = useState('');
    const [reasonAccepted, setReasonAccepted] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
        }
    }, [user.token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = {
                job_category_id: jobCategoryId,
                job_position: jobPosition,
                work_experience: hasWorkExperience === 'yes' ? workExperience : null,
                reason_accepted: reasonAccepted
            };

            const response = await api.post(`/validations?token=${user.token}`, payload);

            if (response.status === 200) {
                alert('Request data validation sent successful');
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit data validation request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main style={{ marginTop: '56px' }}>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>

                <div className="container">
                    {error && (
                        <div className="alert alert-danger mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Job Category</label>
                                        <select 
                                            className="form-control-sm"
                                            value={jobCategoryId}
                                            onChange={(e) => setJobCategoryId(e.target.value)}
                                        >
                                            <option value="1">Computing and ICT</option>
                                            <option value="2">Construction and building</option>
                                            <option value="3">Animals, land and environment</option>
                                            <option value="4">Design, arts and crafts</option>
                                            <option value="5">Education and training</option>
                                        </select>
                                    </div>
                                    <textarea 
                                        className="form-control" 
                                        cols="30" 
                                        rows="5" 
                                        placeholder="Job position sparate with , (comma)"
                                        value={jobPosition}
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Work Experience */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Work Experiences ?</label>
                                        <select 
                                            className="form-control-sm"
                                            value={hasWorkExperience}
                                            onChange={(e) => setHasWorkExperience(e.target.value)}
                                        >
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    {hasWorkExperience === 'yes' && (
                                        <textarea 
                                            className="form-control" 
                                            cols="30" 
                                            rows="5" 
                                            placeholder="Describe your work experiences"
                                            value={workExperience}
                                            onChange={(e) => setWorkExperience(e.target.value)}
                                            required
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea 
                                        className="form-control" 
                                        cols="30" 
                                        rows="6" 
                                        placeholder="Explain why you should be accepted"
                                        value={reasonAccepted}
                                        onChange={(e) => setReasonAccepted(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Request'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}