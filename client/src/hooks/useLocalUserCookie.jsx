import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function useLocalUserCookie() {
    const [get, set] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(["localUser"], {doNotUpdate: true});

    // Fetch appSettings from cookies
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

export default useLocalUserCookie;