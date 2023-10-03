import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import AdminHomePage from './components/adminHomePage';
import LoginPage from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import NotFoundPage from './components/NotFoundPage';
import ConfirmRegisterOtp from './components/AuthComponents/ConfirmRegisterOtp'
import authService from './services/authService'

function App() {
  const { roles } = authService.getUserInfo();
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {roles.includes('ADMIN') && (
            <Route path="/admin" element={<AdminHomePage />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-otp" element={<ConfirmRegisterOtp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
