import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Your main App component
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
