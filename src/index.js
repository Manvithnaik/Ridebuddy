import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this import
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 

// Create a root container for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
