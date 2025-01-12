/*
Component that displays the credits page.
Used directly by App.js and is the / route of the app.
Builds the page with the following components:
    - Header
    - Credits
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value specifying if the current screen size is mobile or not
*/
import React from 'react';
import Credits from '../components/bodies/Credits';
import Container from 'react-bootstrap/Container';
import Header from '../components/wrappers/Header';
import Footer from '../components/wrappers/Footer';



export default function CreditsPage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div style={{minHeight: "100vh"}}>
            <Header darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <Container>
                <Credits user={user} mobile={mobile} windowWidth={windowWidth} />
            </Container>
            <Footer user={user} mobile={mobile} windowWidth={windowWidth} />
        </div>
    );
}