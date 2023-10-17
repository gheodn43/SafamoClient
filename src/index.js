import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/style.css'
import './assets/styles/header.css'
import './assets/styles/footer.css'
import './assets/styles/sidebar.css'
import './assets/styles/property.css'
import './assets/styles/room.css'
import './assets/styles/map.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'font-awesome/css/font-awesome.min.css'
import '@maptiler/sdk/dist/maptiler-sdk.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
