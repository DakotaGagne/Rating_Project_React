/*
Main entry point for the client-side application. 
This file is responsible for rendering the root component of the application to the DOM. 
It also wraps the root component in a StrictMode component to enable additional checks and warnings for potential issues in the application.
! Remove the StrictMode component in production.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)