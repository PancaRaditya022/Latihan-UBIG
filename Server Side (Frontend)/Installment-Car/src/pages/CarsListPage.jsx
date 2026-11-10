import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CarsListPage = () => {
  const [cars, setCars] = useState([]);
  const [appliedCarIds, setAppliedCarIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarsAndApplications();
  }, []);

  const fetchCarsAndApplications = async () => {
    try {
      const [carsRes, appRes] = await Promise.all([
        api.get('/instalment_cars'),
        api.get('/applications'),
      ]);

      setCars(carsRes.data.cars || []);
      const applied = (appRes.data.instalments || []).map((item) => item.id);
      setAppliedCarIds(applied);
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
      <header className="jumbotron jumbotron-fluid bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-4">Cars</h1>
        </div>
      </header>

      <div className="container mb-5">
        <h4 className="text-muted mb-4">List of Cars</h4>
        {cars.map((car) => {
          const isApplied = appliedCarIds.includes(car.id);
          const availableMonthsStr = car.available_month
            ?.map((m) => `${m.month} Months`)
            .join(', ');

          return (
            <div className="card mb-3 p-3 bg-light" key={car.id}>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5>{car.car}</h5>
                  <p className="text-muted mb-0">{car.description}</p>
                </div>
                <div className="col-md-5">
                  <h6 className="fw-bold">Available Month</h6>
                  <p className="text-muted mb-0">{availableMonthsStr}</p>
                </div>
                <div className="col-md-3 text-end">
                  {isApplied ? (
                    <button className="btn btn-success disabled" disabled>
                      Vacancies have been submitted
                    </button>
                  ) : (
                    <Link to={`/instalment-cars/${car.id}`} className="btn btn-danger px-4">
                      Detail
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    </>
  );
};

export default CarsListPage;