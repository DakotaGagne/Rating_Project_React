import React from 'react';
import { Container } from "react-bootstrap";
import CreatePost from "../components/custom/CreatePost";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";
import WelcomeMsg from "../components/custom/WelcomeMsg";
import Profile from "../components/custom/Profile";

function ProfilePage({ updateAppSettings, appSettings, user, localUserCookie, mobile}) {
    return (
        <div>
        <Header page="Profile" post={{uid:1}} appSettings={appSettings} updateAppSettings={updateAppSettings} user={user} mobile={mobile}/>
        <Profile appSettings={appSettings} updateAppSettings={updateAppSettings} user={user} mobile={mobile}/>
        <Footer mobile={mobile}/>
        </div>
    ); 
}

export default ProfilePage;

