
import React, {useState} from 'react';
import { Container } from "react-bootstrap";
import authenticate from '../../utils/authenticate';
import { usernameFormatter } from '../../utils/formatting';

export default function WelcomeMsg({user}) {
    const [username, setUsername] = useState("");
    if(user)authenticate().then((data) => {setUsername(usernameFormatter(data.user.username, false))});

    return (
        <Container>
            {user&&<p className="fs-4">{`Welcome ${username}!`}</p>}
        </Container>
    );
}