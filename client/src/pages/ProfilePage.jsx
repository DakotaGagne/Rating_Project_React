/*
Component that displays the profile page.
Used directly by App.js and is the /profile route of the app.
Builds the page with the following components:
    - Header
    - Profile
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean specifying if the current device is a mobile device
*/
import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from "../components/wrappers/Header";
import Profile from "../components/bodies/Profile";
import Footer from "../components/wrappers/Footer";
import AcceptCookiesModal from "../components/helpers/AcceptCookiesModal";



export default function ProfilePage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div>
            <Header darkMode={darkMode} user={user} windowWidth={windowWidth} />
            <AcceptCookiesModal />
            <Container>
                <Profile darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            </Container>
            <Footer windowWidth={windowWidth} />
        </div>
    ); 
}