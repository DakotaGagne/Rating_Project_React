/*
Component that displays the header of the website. The header contains the website name, a navigation bar, and a dropdown to change to dark and light theme.
The navigation bar contains links to the home page, login/register page, profile page, create post page, credits, and a logout button.
Props:
    - page: The current page of the website (string). Used to highlight the current page in the navigation bar.
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
    - windowWidth: The current width of the window (integer). Used to determine sizing breakpoints.
*/

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconBxMessageSquareEdit from '../icons/IconBxMessageSquareEdit';
import IconMoonStarsFill from '../icons/IconMoonStarsFill';
import IconSunFill from '../icons/IconSunFill';
import { Container, Nav, Navbar, NavDropdown, DropdownToggle, Dropdown } from 'react-bootstrap';
import Cookies from 'js-cookie';
import authenticate from '../../utils/authenticate';
import { usernameFormatter } from '../../utils/formatting';
import { Icon } from '@mui/material';


export default function Header( { page, darkMode, user, mobile, windowWidth } ) {

    // Clear Login Cookie and redirect to logout page
    const logout = () => {if(Cookies.get('localUserJWT'))Cookies.remove('localUserJWT');window.open("http://localhost:3000/auth/logout", "_self");}
    const [username, setUsername] = useState("");
    const fullSize=1200;
    const collapsedMode=992;
    const welcomeMsgMin=360;
    if(user)authenticate().then((data) => {setUsername(data.user.username)});

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary border-bottom font-domine" sticky='top' style={{zIndex: 9999}}>
            <Container>
                <Navbar.Brand href="/" className="fs-1">
                    <IconBxMessageSquareEdit className="h-100 me-1 mb-2" />
                    Ratingly
                </Navbar.Brand>
                {user&&windowWidth>=welcomeMsgMin&&<Navbar.Text className="fs-4 fst-italic">{mobile?`Hi ${usernameFormatter(username, true)}!`:`${windowWidth>=fullSize?"Welcome":"Hi"} ${usernameFormatter(username, false)}!`}</Navbar.Text>}
                <Navbar.Toggle className={"mb-2"} />
                <Navbar.Collapse>
                    <Nav variant="tabs" className="ms-auto text-center" activeKey={location.pathname}>
                        <Nav.Link onClick={()=>navigate("/")} eventKey="/" className="hovering">Home</Nav.Link>
                        {user==false&&<Nav.Link onClick={()=>navigate("/login")} eventKey="/login" className="hovering">Login/Register</Nav.Link>}
                        {user&&<Nav.Link onClick={()=>navigate("/profile")} eventKey="/profile" className="hovering">Profile</Nav.Link>}
                        <Nav.Link onClick={()=>navigate("/create")} eventKey="/create" className="hovering">Create{windowWidth>=fullSize||windowWidth<collapsedMode?" Post":""}</Nav.Link>
                        {windowWidth>=collapsedMode&&<Nav.Link disabled >|</Nav.Link>}
                        <Dropdown as={Nav.Item} className="hovering">
                            <DropdownToggle className="align-items-center" as={Nav.Link}>
                                {darkMode.get?<IconSunFill className="me-2 mb-1"/>:<IconMoonStarsFill className="me-2 mb-1"/>}
                                {darkMode.get?`Dark${windowWidth>=fullSize||windowWidth<collapsedMode?" Theme":""}`: `Light${windowWidth>=fullSize||windowWidth<collapsedMode?" Theme":""}`}
                            </DropdownToggle>
                            <Dropdown.Menu className="bg-body-tertiary text-center">
                                <NavDropdown.Item onClick={ () => {darkMode.set(false)} }>
                                    <IconSunFill className="me-2 mb-1"/>
                                    Light Theme
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={ () => {darkMode.set(true)} }>
                                    <IconMoonStarsFill className="me-2 mb-1"/>
                                    Dark Theme
                                </NavDropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {user&&<Nav.Link onClick={()=>navigate("/credits")} eventKey="/credits" className="hovering">Credits</Nav.Link>}
                        {user&&<Nav.Link onClick={logout} className="hovering">Logout</Nav.Link>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}