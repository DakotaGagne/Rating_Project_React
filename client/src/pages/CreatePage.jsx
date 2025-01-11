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
import CreatePost from "../components/custom/CreatePost";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";
import WelcomeMsg from "../components/custom/WelcomeMsg";



export default function CreatePage({ darkMode, user, mobile, windowWidth }) {
    return (
        <div>
            <Header page="Create" darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <WelcomeMsg user={user} mobile={mobile} windowWidth={windowWidth} />
            <CreatePost darkMode={darkMode} user={user} mobile={mobile} windowWidth={windowWidth} />
            <Footer mobile={mobile} windowWidth={windowWidth} />
        </div>
    ); 
}