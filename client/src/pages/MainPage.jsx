import React from 'react';
import { Container } from "react-bootstrap";
import Posts from "../components/custom/Posts";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";

function MainPage({ updateAppSettings, appSettings }) {
    return (
        <div>
        <Header page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        <Container>
            <Posts page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        </Container>
        <Footer />
        </div>
    );
}

export default MainPage;