import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/style/tailwind.css";
import './index.css';
import { Provider } from 'react-redux';
import configStore from './redux/store/store';
import reportWebVitals from './reportWebVitals';
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
