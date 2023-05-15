import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {NotificationsProvider} from "./context/NotificationsProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <App className="test" />
      </NotificationsProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
