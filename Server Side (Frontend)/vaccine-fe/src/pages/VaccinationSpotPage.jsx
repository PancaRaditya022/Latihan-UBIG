import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VaccinationSpotsPage = () => {
    const [spots, setSpots] = useState([]);
    const [region, setRegion] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user.token) {
            navigate('/login');
            return;
        }
        fetchSpots();
    }, [user.token, navigate]);

    const fetchSpots = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/spots?token=${user.token}`);
            
            const spotsData = response.data.spots || response.data.data || response.data || [];
            const regionName = response.data.region?.district || response.data.district || 'Central Jakarta';
            
            setSpots(spotsData);
            setRegion(regionName);
        } catch (error) {
            console.error('Error fetching vaccination spots:', error);
        } finally {
            setLoading(false);
        }
    };

    const getServeInfo = (serveCode) => {
        switch (Number(serveCode)) {
            case 1:
                return { text: 'Only first vaccination', validFor: [1] };
            case 2:
                return { text: 'Only second vaccination', validFor: [2] };
            case 3:
                return { text: 'Both vaccination', validFor: [1, 2] };
            default:
                return { text: 'Unknown service', validFor: [] };
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    <p>Loading vaccination spots...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">First Vaccination</h1>
                    </div>
                </header>

                <div className="container mb-5">
                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">
                            List Vaccination Spots in {region}
                        </h4>
                    </div>

                    <div className="section-body">
                        {spots.length === 0 ? (
                            <p className="text-muted">No vaccination spots available in your region.</p>
                        ) : (
                            spots.map((spot) => {
                                const serveInfo = getServeInfo(spot.serve);
                                
                                const currentDose = 1;
                                const isAvailable = serveInfo.validFor.includes(currentDose);

                                let vaccinesList = '-';
                                if (spot.available_vaccines && typeof spot.available_vaccines === 'object') {
                                    const availableNames = Object.entries(spot.available_vaccines)
                                        .filter(([vaccineName, isAvailable]) => isAvailable === true)
                                        .map(([vaccineName]) => vaccineName);
                                    
                                    vaccinesList = availableNames.length > 0 ? availableNames.join(', ') : 'None available';
                                } else if (typeof spot.vaccines === 'string') {
                                    vaccinesList = spot.vaccines;
                                }

                                return (
                                    <article 
                                        key={spot.id} 
                                        className={`spot ${!isAvailable ? 'unavailable' : ''}`}
                                        style={{ cursor: isAvailable ? 'pointer' : 'default' }}
                                        onClick={() => {
                                            if (isAvailable) {
                                                navigate(`/vaccination-spots/${spot.id}`);
                                            }
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-5">
                                                <h5 className="text-primary">{spot.name}</h5>
                                                <span className="text-muted">{spot.address}</span>
                                            </div>
                                            <div className="col-4">
                                                <h5>Available vaccines</h5>
                                                <span className="text-muted">{vaccinesList}.</span>
                                            </div>
                                            <div className="col-3">
                                                <h5>Serve</h5>
                                                <span className="text-muted">
                                                    {serveInfo.text}
                                                </span>
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
};

export default VaccinationSpotsPage;