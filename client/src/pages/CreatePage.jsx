import React from 'react';
import { Container } from "react-bootstrap";
import CreatePost from "../components/custom/CreatePost";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";
import WelcomeMsg from "../components/custom/WelcomeMsg";

function CreatePage({ updateAppSettings, appSettings, user, localUserCookie }) {
    return (
        <div>
        <Header page="Create" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings} user={user}/>
        <WelcomeMsg user={user} />
        <CreatePost appSettings={appSettings} updateAppSettings={updateAppSettings} user={user}/>
        <Footer />
        </div>
    ); 
}

export default CreatePage;