/*
Utility function to authenticate user with the server
Function returns a promise that resolves to the user data if the user is authenticated, otherwise it resolves to null
If setUser is passed as an argument, the function will set the user state to the user data if the user is authenticated
Makes it so that the user is authenticated on page load, the evidence is stored in the user variable
But when the user wants to perform a secure action (create post, etc), the user is authenticated again, and the user data is used to perform the action
*/

import Cookies from 'js-cookie';
export default function authenticate(setUser=null){
    const localUserJWT = Cookies.get('localUserJWT');
    // Fetch user data from server and return a promise
    return fetch('http://localhost:3000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Authorization': localUserJWT?`Bearer ${localUserJWT}`:undefined
        }
    })
    .then(res => {
        if(res.status===200)return res.json();
        if(res.status===401)throw new Error("User not authenticated");
        throw new Error("An unknown error occurred: " + res);
    })
    .then(data => {
        // Data contains the user data stored in the database
        // If setUser is passed as an argument, set the user state to the user data
        if(setUser!=null)setUser(data.type);
        return data;
    })
    .catch(err => {
        console.log(err);
        if(setUser!=null)setUser(false);
        return null;
    });
}