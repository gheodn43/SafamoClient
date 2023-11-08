import '@maptiler/sdk/dist/maptiler-sdk.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery';
import 'popper.js';
import React from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/styles/address.css';
import './assets/styles/admin.css';
import './assets/styles/footer.css';
import './assets/styles/header.css';
import './assets/styles/map.css';
import './assets/styles/profile.css';
import './assets/styles/property.css';
import './assets/styles/room.css';
import './assets/styles/sidebar.css';
import './assets/styles/startRate.css';
import './assets/styles/style.css';
import './index.css';
import store from './redux/store';


import App from './App';
import reportWebVitals from './reportWebVitals';
export { default as Paypal } from './components/Paypal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
