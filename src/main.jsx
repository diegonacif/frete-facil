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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGoogleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthGoogleProvider>
  </React.StrictMode>,
)
