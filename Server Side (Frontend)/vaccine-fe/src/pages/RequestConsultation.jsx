import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RequestConsultation = () => {
    const [isDisease, setIsDisease] = useState('yes');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [isSymptoms, setIsSymptoms] = useState('yes');
    const [symptomsDescription, setSymptomsDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const storedToken = localStorage.getItem('token');
            let token = storedToken;

            try {
                const parsed = JSON.parse(storedToken);
                if (parsed && parsed.token) {
                    token = parsed.token;
                }
            } catch {
            }
            
            await api.post(`/consultations?token=${token}`, {
                disease_history: isDisease === 'yes' ? diseaseDescription : '',
                current_symptoms: isSymptoms === 'yes' ? symptomsDescription : ''
            });

            alert('Request consultation successful');
            navigate('/dashboard');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to submit consultation request');
        }
    };

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Consultation</h1>
                    </div>
                </header>

                <div className="container">
                    {errorMsg && (
                        <div className="alert alert-danger">{errorMsg}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Do you have disease history ?</label>
                                        <select 
                                            className="form-control-sm"
                                            value={isDisease}
                                            onChange={(e) => setIsDisease(e.target.value)}
                                        >
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    {isDisease === 'yes' && (
                                        <div className="form-group mb-0">
                                            <textarea 
                                                id="disease-history" 
                                                className="form-control" 
                                                cols="30" 
                                                rows="10" 
                                                value={diseaseDescription}
                                                onChange={(e) => setDiseaseDescription(e.target.value)}
                                                placeholder="Describe your disease history"
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Do you have symptoms now ?</label>
                                        <select 
                                            className="form-control-sm"
                                            value={isSymptoms}
                                            onChange={(e) => setIsSymptoms(e.target.value)}
                                        >
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    {isSymptoms === 'yes' && (
                                        <div className="form-group mb-0">
                                            <textarea 
                                                id="current-symptoms" 
                                                className="form-control" 
                                                cols="30" 
                                                rows="10" 
                                                value={symptomsDescription}
                                                onChange={(e) => setSymptomsDescription(e.target.value)}
                                                placeholder="Describe your current symptoms"
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Send Request</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default RequestConsultation;