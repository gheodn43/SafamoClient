import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import LoginPage from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import NotFoundPage from './components/NotFoundPage';
import ConfirmRegisterOtp from './components/AuthComponents/ConfirmRegisterOtp'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/confirm-otp' element={<ConfirmRegisterOtp/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
