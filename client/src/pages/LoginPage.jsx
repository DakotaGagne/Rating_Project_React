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
    - windowWidth: the current width of the window
*/
import React from 'react';
import LoginRegister from "../components/bodies/LoginRegister";
import Container from 'react-bootstrap/Container';
import Header from "../components/wrappers/Header";
import Footer from "../components/wrappers/Footer";
import AcceptCookiesModal from "../components/helpers/AcceptCookiesModal";



export default function LoginPage( { darkMode, user, mobile, windowWidth, serverConn } ) {
    return (
        <div>
            <Header darkMode={darkMode} user={user} windowWidth={windowWidth} />
            <AcceptCookiesModal />
            <Container>
                <LoginRegister darkMode={darkMode} user={user} serverConn={serverConn} />
            </Container>
            <Footer windowWidth={windowWidth} />
        </div>
    ); 
}