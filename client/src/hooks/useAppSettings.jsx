import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function useAppSettings() {
    const [appSettings, setAppSettings] = useState({
        darkMode: false
    });

    function updateAppSettings(obj){
        setAppSettings({...appSettings, ...obj});
    }

    const [cookies, setCookie, removeCookie] = useCookies(["appSettings"], {doNotUpdate: true});

    // Fetch appSettings from cookies
    useEffect(() => {
        const storedAppSettings = cookies.appSettings;
        if (storedAppSettings !== undefined) {
        updateAppSettings(storedAppSettings);
        }
    }, []);

    // Update cookies when appSettings change
    useEffect(() => {
        setCookie("appSettings", appSettings, { path: "/", maxAge: 60 * 60 * 24 * 7 });
    }, [appSettings]);
    

    useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-bs-theme', appSettings.darkMode ? 'dark' : 'light');
    }, [appSettings.darkMode]);

    return { appSettings, updateAppSettings };
}

export default useAppSettings;