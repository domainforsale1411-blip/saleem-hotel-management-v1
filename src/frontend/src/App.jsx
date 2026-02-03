import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './components/ChatAssistant';

// Placeholder components
const Home = () => <h1>Home Page</h1>;
const Login = () => <h1>Login Page</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatAssistant />
    </div>
  );
}

export default App;
