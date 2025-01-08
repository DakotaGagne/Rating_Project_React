import React from 'react';
import { Container } from "react-bootstrap";
import LoginRegister from "../components/custom/LoginRegister";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";

export default function LoginPage({ updateAppSettings, appSettings, user, mobile}) {
    return (
        <div>
        <Header page="Login" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings} user={user} mobile={mobile}/>
        <LoginRegister appSettings={appSettings} updateAppSettings={updateAppSettings} user={user} mobile={mobile}/>
        <Footer mobile={mobile}/>
        </div>
    ); 
}
