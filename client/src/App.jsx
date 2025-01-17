/*
Component that acts as the main container for the entire application.
This component is the parent of all other components and is responsible for routing between different pages.
Called by main.jsx
*/

// Main Imports
import React, {useState, useEffect} from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Custom Hooks
import useDarkMode from "./hooks/useDarkMode";

// Utils
import authenticate from './utils/authenticate';
import Bowser from 'bowser';
import ping from './utils/ping';

// CSS Imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Page Imports
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreditsPage from "./pages/CreditsPage";



export default function App() {
  // Constants and States
  const [serverConn, setServerConn] = useState(false);
  const darkMode = useDarkMode();
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileLimit = 768;
  
  const parser = Bowser.getParser(navigator.userAgent);

  function pingServer() {
    console.log('Pinging Server');
    ping().then(res => {
      if(res.ok){
        console.log('Server is connected');
        setServerConn(true);
      } else {
        console.log('Server is not connected');
        setServerConn(false);
        setTimeout(pingServer, 1000);
      } 
    });
  }
  useEffect(() => {pingServer();}, []);

  // setTimeout(() => {authenticate(setUser)}, 1000);
  // useEffects
  useEffect(() => {
    // Check if user is logged in (set user state)
    authenticate(setUser);
  }, []);

	useEffect(() => {
    // set mobile state on resize 
    
    const handleResize = () => {
      setMobile(window.innerWidth<mobileLimit||parser.getPlatformType()==="mobile");
      // setMobile(window.innerWidth<mobileLimit);

      setWindowWidth(window.innerWidth);
    };
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);


  
  return (
    <div>
      <HashRouter>
          <Routes>
              <Route index element={
                <MainPage 
                  darkMode={darkMode}
                  user={user}
                  mobile={mobile}
                  windowWidth={windowWidth}
              />}></Route>
              <Route path="/create" element={
                <CreatePage 
                  darkMode={darkMode}
                  user={user}
                  mobile={mobile}
                  windowWidth={windowWidth}
                  serverConn={serverConn}
              />}></Route>
              <Route path="/login" element={
                <LoginPage 
                  darkMode={darkMode} 
                  user={user}
                  mobile={mobile}
                  windowWidth={windowWidth}
                  serverConn={serverConn}
              />}></Route>
              <Route path="/profile" element={
                <ProfilePage 
                  darkMode={darkMode} 
                  user={user}
                  mobile={mobile}
                  windowWidth={windowWidth}
              />}></Route>
              <Route path="/credits" element={
                <CreditsPage 
                  darkMode={darkMode} 
                  user={user}
                  mobile={mobile}
                  windowWidth={windowWidth}
              />}></Route>
              <Route path="*" element={<h1 className="w-100 text-center my-5">404 Page Not Found</h1>}></Route>
          </Routes>
      </HashRouter>
    </div>
  );
};