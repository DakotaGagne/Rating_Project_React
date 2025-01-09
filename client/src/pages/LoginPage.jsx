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
import LoginRegister from "../components/custom/LoginRegister";
import Header from "../components/bootstrap/Header";
import Footer from "../components/bootstrap/Footer";



export default function LoginPage( { darkMode, user, mobile } ) {
    return (
        <div>
        <Header page="Login" post={{uid:1}} darkMode={darkMode} user={user} mobile={mobile}/>
        <LoginRegister darkMode={darkMode} user={user} mobile={mobile}/>
        <Footer mobile={mobile}/>
        </div>
    ); 
}