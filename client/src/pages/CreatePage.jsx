import React from 'react';
import { Container } from "react-bootstrap";
import CreatePost from "../components/custom/CreatePost";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";

function CreatePage({ updateAppSettings, appSettings }) {
    return (
        <div>
        <Header page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        <Container>
            <Posts page="Home" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings}/>
            <CreatePost appSettings={appSettings} updateAppSettings={updateAppSettings}/>
        </Container>
        <Footer />
        </div>
    );
}

export default CreatePage;