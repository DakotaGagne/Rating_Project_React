/*
Custom Hook that manages the dark mode setting for the application. 
This hook will set the dark mode setting in the cookies and update the application theme based on the current setting.
Other Components can use this hook to access the current dark mode setting, and change it as needed.
When a change occurs, this hook will detect that change and update the application theme and cookie accordingly.
*/
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";



export default function useDarkMode() {
    // Constants and States
    const [darkMode, setDarkMode] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["darkMode"], {doNotUpdate: true});

    // Fetch appSettings from cookies on first render
    useEffect(() => {
        const storedDarkMode = cookies.darkMode;
        if (storedDarkMode !== undefined)setDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        // Update cookies when appSettings change
        setCookie("darkMode", darkMode, { path: "/", maxAge: 60 * 60 * 24 * 7 });
        // Update the application theme based on the current setting
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return {get: darkMode, set: setDarkMode};
}