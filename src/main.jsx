import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthGoogleProvider } from './contexts/AuthGoogleProvider';
import { App } from './App';
import { Login } from './pages/Login/Login';
import { PrivateRoutes } from './PrivateRoutes';
import { Management } from './pages/Management/Management';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGoogleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/management" element={<Management />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthGoogleProvider>
  </React.StrictMode>,
)
