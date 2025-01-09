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
import Header from "../components/bootstrap/Header";
import Profile from "../components/custom/Profile";
import Footer from "../components/bootstrap/Footer";



export default function ProfilePage( { darkMode, user, mobile } ) {
    return (
        <div>
            <Header page="Profile" darkMode={darkMode} user={user} mobile={mobile}/>
            <Profile darkMode={darkMode} user={user} mobile={mobile}/>
            <Footer mobile={mobile}/>
        </div>
    ); 
}