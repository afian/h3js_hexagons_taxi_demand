import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MapBoxSvg from './components/MapBoxMultipleHex';
import reportWebVitals from './reportWebVitals';
import 'rc-slider/assets/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
  
);
root.render(
  <React.StrictMode>
    <MapBoxSvg />
  </React.StrictMode>
);
reportWebVitals();