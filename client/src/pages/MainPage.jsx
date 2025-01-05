import React from 'react';
import { Container } from "react-bootstrap";
import Posts from "../components/custom/Posts";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";
import WelcomeMsg from "../components/custom/WelcomeMsg";

function MainPage({ updateAppSettings, appSettings, user, localUserCookie }) {
    return (
        <div>
        <Header page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings} user={user}/>
        <WelcomeMsg user={user}/>
        <Posts appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        <Footer />
        </div>
    );
}

export default MainPage;