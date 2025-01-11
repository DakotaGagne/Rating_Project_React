/*
Component that displays the main page.
Used directly by App.js and is the / route of the app.
Builds the page with the following components:
    - Header
    - WelcomeMsg
    - Posts
    - Footer

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: either false or a string specifying the login type (local, google, github) of the current user
    - mobile: boolean value specifying if the current screen size is mobile or not
*/
import React from 'react';
import Posts from "../components/custom/Posts";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";
import WelcomeMsg from "../components/custom/WelcomeMsg";



export default function MainPage( { darkMode, user, mobile, windowWidth } ) {
    return (
        <div>
            <Header page="Home" darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <WelcomeMsg user={user} mobile={mobile} windowWidth={windowWidth} />
            <Posts darkMode={darkMode} mobile={mobile} windowWidth={windowWidth} />
            <Footer mobile={mobile} windowWidth={windowWidth} />
        </div>
    );
}