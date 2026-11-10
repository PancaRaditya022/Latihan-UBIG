import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/instalment_cars/${id}`);
      const data = res.data.instalment;
      setCar(data);
      if (data.available_month?.length > 0) {
        setSelectedMonth(data.available_month[0].month);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!car) return <div className="text-center my-5">Loading...</div>;

  const nominalPerMonth = selectedMonth ? Math.round(Number(car.price) / Number(selectedMonth)) : 0;

  const handleApply = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/applications', {
        instalment_id: car.id,
        months: Number(selectedMonth),
        notes: notes,
      });

      alert('Applying for Instalment successful');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for instalment.');
    }
  };

  return (
    <>
      <Navbar />
      <header className="jumbotron jumbotron-fluid bg-light py-4 mb-4 text-center">
        <div className="container">
          <h1 className="display-4">{car.car}</h1>
          <p className="lead text-muted">Brand : {car.brand}</p>
        </div>
      </header>

      <div className="container mb-5">
        {error && <div className="alert alert-danger mb-4">{error}</div>}

        <div className="mb-4">
          <h5>Description</h5>
          <p className="text-muted">{car.description}</p>
        </div>

        <div className="mb-4">
          <h5>Price : <span className="badge badge-primary fs-6">Rp. {Number(car.price).toLocaleString('id-ID')}</span></h5>
        </div>

        <form onSubmit={handleApply}>
          <div className="form-group mb-4">
            <label className="h5 mb-2">Select Months</label>
            <select
              className="form-control"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {car.available_month?.map((m) => (
                <option key={m.month} value={m.month}>
                  {m.month} Months
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h5>
              Nominal/Month :{' '}
              <span className="badge badge-primary fs-6">
                Rp. {nominalPerMonth.toLocaleString('id-ID')}
              </span>
            </h5>
          </div>

          <div className="form-group mb-4">
            <label className="mb-2">Notes</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Explain why your installment should be approved"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary px-4">
            Apply
          </button>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default CarDetailPage;