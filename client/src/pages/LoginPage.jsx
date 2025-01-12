/*
Component that displays the Login/Register page.
Used directly by App.js and is the /login route of the app.
Builds the page with the following components:
    - Header
    - LoginRegister
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value that determines if the screen size is mobile or not
*/
import React from 'react';
import LoginRegister from "../components/bodies/LoginRegister";
import Container from 'react-bootstrap/Container';
import Header from "../components/wrappers/Header";
import Footer from "../components/wrappers/Footer";



export default function LoginPage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div style={{minHeight: "100vh"}}>
            <Header darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <Container>
                <LoginRegister darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            </Container>
            <Footer darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
        </div>
    ); 
}