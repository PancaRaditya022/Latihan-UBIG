import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RequestValidationPage = () => {
    const [isWorking, setIsWorking] = useState('yes');
    const [job, setJob] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [income, setIncome] = useState('');
    const [reasonAccepted, setReasonAccepted] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/validation', {
                job: isWorking === 'yes' ? job : null,
                job_description: isWorking === 'yes' ? jobDescription : null,
                income: isWorking === 'yes' ? income : null,
                reason_accepted: reasonAccepted,
            });

            alert('Request data validation sent successful');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit validation request.');
        }
    };

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>

                <div className="container">
                    {error && 
                        <div className="alert alert-danger">{error}</div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Are you working?</label>
                                        <select
                                            className="form-control-sm"
                                            value={isWorking}
                                            onChange={(e) => setIsWorking(e.target.value)}
                                        >
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    {isWorking == 'yes' && (
                                        <>
                                            <div className="form-group mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    placeholder='Your Job'
                                                    onChange={(e) => setJob(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <textarea
                                                    rows="3"
                                                    className='form-control'
                                                    placeholder='describe what you do in your job'
                                                    value={jobDescription}
                                                    onChange={(e) => setJobDescription(e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input 
                                                    type="number"
                                                    className='form-control'
                                                    placeholder='Income (Rp)'
                                                    value={income}
                                                    onChange={(e) => setIncome(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="form-group mb-3">
                                    <label className="mb-2">Reason Accepted</label>
                                    <textarea 
                                        rows="6"
                                        value={reasonAccepted}
                                        className='form-control'
                                        onChange={(e) => setReasonAccepted(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" type='submit'>Send Request</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default RequestValidationPage;