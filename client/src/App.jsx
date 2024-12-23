// Main Imports
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import useAppSettings from "./hooks/useAppSettings";


// CSS Imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom Imports
import MainPage from "./pages/MainPage";

// TODO: Fix the way posts look
// TODO: Add filters and ttl posts per page and pages to main page
// TODO: Fix the OVAL

function App(){

  const { appSettings, updateAppSettings } = useAppSettings();

  return (
    <div>
      <Container className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage appSettings={appSettings} updateAppSettings={updateAppSettings} />}></Route>
            <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;