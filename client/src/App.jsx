// Main Imports
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import useAppSettings from "./hooks/useAppSettings";
// import useLocalUserCookie from "./hooks/useLocalUserCookie";
import Cookies from 'js-cookie';
import authenticate from './utils/authenticate';


// CSS Imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom Imports
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// TODO: Add filters and ttl posts per page and pages to main page
// TODO: Need to make it responsive on mobile

function App(){

  const { appSettings, updateAppSettings } = useAppSettings();

  // const localUserCookie = useLocalUserCookie();

  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticate(setUser)
  }, [])

  return (
    <div>
      <Container className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={
              <MainPage 
                appSettings={appSettings} 
                updateAppSettings={updateAppSettings} 
                user={user}
            />}></Route>
            <Route path="/create" element={
              <CreatePage 
                appSettings={appSettings} 
                updateAppSettings={updateAppSettings} 
                user={user}
            />}></Route>
            <Route path="/login" element={
              <LoginPage 
                appSettings={appSettings} 
                updateAppSettings={updateAppSettings} 
                user={user}
            />}></Route>
            <Route path="/profile" element={
              <ProfilePage 
                appSettings={appSettings} 
                updateAppSettings={updateAppSettings} 
                user={user}
            />}></Route>
            <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;