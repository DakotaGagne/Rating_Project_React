/*
Component that displays the main page.
Used directly by App.js and is the / route of the app.
Builds the page with the following components:
    - Header
    - Posts
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value specifying if the current screen size is mobile or not
    - windowWidth: integer value specifying the current width of the window
*/
import React from 'react';
import Container from 'react-bootstrap/Container';
import Posts from '../components/bodies/Posts'
import Header from '../components/wrappers/Header';
import Footer from '../components/wrappers/Footer';



export default function MainPage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div>
            <Header darkMode={darkMode} user={user} windowWidth={windowWidth} />
            <Container>
                <Posts darkMode={darkMode} mobile={mobile} windowWidth={windowWidth} />
            </Container>
            <Footer windowWidth={windowWidth} />
        </div>
    );
}