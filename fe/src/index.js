import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {NotificationsProvider} from "./context/NotificationsProvider";
import {AuthProvider} from "./context/AuthProvider";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SnacksProvider} from "./context/SnacksProvider";

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <SnacksProvider>
        <AuthProvider>
          <NotificationsProvider>
            <App className="test"/>
          </NotificationsProvider>
        </AuthProvider>
      </SnacksProvider>
    </LocalizationProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
