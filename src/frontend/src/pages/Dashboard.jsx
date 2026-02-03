import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ChatWidget from '../components/ChatWidget';

const DashboardHome = () => {
  const { t } = useTranslation();
  return <h2>{t('dashboardWelcome')}</h2>;
};

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/v1/hotels', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <h3>{t('myHotels')}</h3>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>{hotel.nameEn} / {hotel.nameAr}</li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#1a73e8', color: 'white', padding: '1rem' }}>
        <h3>Saleem Admin</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>{t('overview')}</Link>
          <Link to="/dashboard/hotels" style={{ color: 'white', textDecoration: 'none' }}>{t('hotels')}</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{t('logout')}</button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/hotels" element={<HotelList />} />
        </Routes>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
