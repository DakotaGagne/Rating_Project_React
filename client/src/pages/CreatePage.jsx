/*
Component that displays the create post page.
Used directly by App.js and is the /create route of the app.
Builds the page with the following components:
    - Header
    - CreatePost
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value that determines if the screen size is mobile or not
    - windowWidth: the current width of the window
*/
import React from 'react';
import Container from 'react-bootstrap/Container';
import CreatePost from "../components/bodies/CreatePost";
import Header from "../components/wrappers/Header";
import Footer from "../components/wrappers/Footer";



export default function CreatePage( { darkMode, user, mobile, windowWidth, serverConn } ) {
    return (
        <div>
            <Header darkMode={darkMode} user={user} windowWidth={windowWidth} />
            <Container>
                <CreatePost darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} serverConn={serverConn} />
            </Container>
            <Footer windowWidth={windowWidth} />
        </div>
    ); 
}