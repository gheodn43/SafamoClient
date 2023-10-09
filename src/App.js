import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import AdminHomePage from './components/adminHomePage';
import PropertiesPage from './components/PropertiesPage'
import LoginPage from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import ConfirmRegisterOtp from './components/AuthComponents/ConfirmRegisterOtp'
import LandlordReqDetail from './components/RequestComponents/landlordRequestDetail'
import NotFoundPage from './components/NotFoundPage';
import authService from './services/authService'
import PropertyRegisStepper from './hooks/useStepper';

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
          <Route path="/requests/landlord_req_detail" element={<LandlordReqDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-otp" element={<ConfirmRegisterOtp />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/rental_manage/property" element={<PropertiesPage/>} />
          <Route path="/rental_manage/addProperty" element={<PropertyRegisStepper/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
