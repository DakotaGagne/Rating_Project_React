/*
Custom Hook that manages the localUserCookie (stores the JWT when using a local login)
- Fetches the localUserCookie from cookies when the hook renders
- Updates the localUserCookie in cookies when the localUserCookie state changes
- Returns the localUserCookie state and a function to update the localUserCookie state
- Other components can use this hook to manage the localUserCookie (and change the localUserCookie state)
*/
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";



export default function useLocalUserCookie() {
    // State to store the localUserCookie
    const [get, set] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["localUser"], {doNotUpdate: true});

    // Fetch localUser JWT from cookies
    useEffect(() => {
        const storedLocalUserCookie = cookies.localUser;
        if (storedLocalUserCookie !== undefined) {
            set(storedLocalUserCookie);
        }
    }, []);

    // Update cookies when appSettings change
    useEffect(() => {
        if(get !== ''){
            setCookie("localUser", get, { path: "/", maxAge: 60 * 60 * 24 * 7 });
        } else {
            removeCookie("localUser");
        }
    }, [get]);

    return { get, set };
}