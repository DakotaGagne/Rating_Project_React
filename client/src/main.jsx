/*
Main entry point for the client-side application. 
This file is responsible for rendering the root component of the application to the DOM. 
*/

import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)