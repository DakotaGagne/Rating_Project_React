import React from 'react';
import { Container } from "react-bootstrap";
import Posts from "../components/custom/Posts";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";

function MainPage({ updateAppSettings, appSettings }) {
    return (
        <div>
        <Header page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        <Posts appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        <Footer />
        </div>
    );
}

export default MainPage;