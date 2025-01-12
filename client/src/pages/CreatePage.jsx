/*
Component that displays the create post page.
Used directly by App.js and is the /create route of the app.
Builds the page with the following components:
    - Header
    - WelcomeMsg
    - CreatePost
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value that determines if the screen size is mobile or not
*/
import React from 'react';
import CreatePost from "../components/bodies/CreatePost";
import Container from 'react-bootstrap/Container';
import Header from "../components/wrappers/Header";
import Footer from "../components/wrappers/Footer";



export default function CreatePage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div style={{minHeight: "100vh"}}>
            <Header darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <Container>
                <CreatePost darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            </Container>
            <Footer darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
        </div>
    ); 
}