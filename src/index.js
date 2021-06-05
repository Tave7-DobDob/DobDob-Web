import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import './style.css'
import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

