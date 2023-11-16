import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import AdminHomePage from './components/adminHomePage';
import Requests from './components/AdminComponents/AdminRequestComponent';
import AdminProperty from './components/AdminComponents/AdminPropertyComponent';
import AdminNotification from './components/AdminComponents/AdminNotificationComponent';
import AdminReport from './components/AdminComponents/AdminReportComponent';
import AdminTag from './components/AdminComponents/AdminTagComponent';
import AdminUser from './components/AdminComponents/AdminUserComponent';
import AdminPropertyDetail from './components/PropertyComponents/propertyDetail';
import RentalManagerPage from './components/rentalManagerPage';
import PropertiesPage from './components/PropertiesPage'
import RequestPage from './components/RequestPage';
import LoginPage from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import ConfirmRegisterOtp from './components/AuthComponents/ConfirmRegisterOtp'
import LandlordReqDetail from './components/RequestComponents/landlordRequestDetail'
import NotFoundPage from './components/NotFoundPage';
import authService from './services/authService'
import PropertyRegisStepper from './hooks/useStepper';
import CustomerPropertyDetail from './components/PropertyComponents/CreatePropertyComponent/customerPropertyDetail';
import RoomsValid from './components/RoomComponents/RoomsValid';
import RoomValidDetail from './components/RoomComponents/RoomValidDetail';
import RoomDetail from './components/RoomComponents/RoomEdit';
import RentalRequestDetail from './components/RequestComponents/rentalRequestDetail';
import PrepareContractAndInvoice from './components/RoomComponents/prepareContractAndInvoice';
import PreviewContract from './components/RoomComponents/PreviewContract';
import MyRooms from './components/RoomComponents/MyRooms';
import MyRoomRentedDetail from './components/RoomComponents/MyRoomDetail';
import Profile from './components/UserProfile';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Test from './components/TestComponent';
function App() {
  const initialOptions = {
    clientId: "AdTU7ucynOszIWJC3ArYOHSSsdYNTbRsP0EnVDnJUCbESlXtIoduWfOfPZVBrGrYfinUwGYbiTFkM6pP",
    currency: "USD",
    intent: "capture",
  };
  const { roles } = authService.getUserInfo();
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {roles.includes('ADMIN') && (
              <>
                <Route path="/admin" element={<AdminHomePage />} />
                <Route path="/admin/request" element={<Requests />} />
                <Route path="/admin/property" element={<AdminProperty />} />
                <Route path="/admin/notification" element={<AdminNotification />} />
                <Route path="/admin/report" element={<AdminReport />} />
                <Route path="/admin/tags" element={<AdminTag />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/property/detail/:requestId" element={<AdminPropertyDetail />} />
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-otp" element={<ConfirmRegisterOtp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/requests/landlord_req_detail" element={<LandlordReqDetail />} />
            <Route path="/rental_manage" element={<RentalManagerPage />} />
            <Route path="/rental_manage/property" element={<PropertiesPage />} />
            <Route path="/rental_manage/request" element={<RequestPage />} />
            <Route path="/rental_manage/my-rooms" element={<MyRooms />} />
            <Route path="/rental_manage/my-room" element={<MyRoomRentedDetail />} />
            <Route path="/rental_manage/request-receive" element={<RequestPage />} />
            <Route path="/rental_manage/addProperty" element={<PropertyRegisStepper />} />
            <Route path="/rental_manage/property_detail/:requestId" element={<CustomerPropertyDetail />} />
            <Route path="/rental_manage/rental-request-detail/:requestId" element={<RentalRequestDetail />} />
            <Route path="/rental_manage/room-edit/:roomId" element={<RoomDetail />} />
            <Route path="/rental_manage/contract-prepare" element={<PrepareContractAndInvoice />} />
            <Route path="/rental_manage/previewContract" element={<PreviewContract />} />
            <Route path="/rooms-for-rent" element={<RoomsValid />} />
            <Route path="/rooms-for-rent/:roomId" element={<RoomValidDetail />} />
          </Routes>

        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
