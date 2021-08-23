import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';

export const history = createBrowserHistory();
history.location.state = { expired: false };

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


axios.interceptors.response.use((config) => {
  return config;
}, (err) => {
  if (err.response.status === 401) history.push('/login', { expired: true });
  return Promise.reject(err);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
