/*
Component that displays a welcome message to the user.

Props:
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/
import React, {useState} from 'react';
import { Container } from "react-bootstrap";
import authenticate from '../../utils/authenticate';
import { usernameFormatter } from '../../utils/formatting';

export default function WelcomeMsg( { user, mobile, windowWidth } ) {
    const [username, setUsername] = useState("");
    if(user)authenticate().then((data) => {setUsername(usernameFormatter(data.user.username, false))});

    return (
        <Container>
            {user&&<p className="fs-4">{`Welcome ${username}!`}</p>}
        </Container>
    );
}