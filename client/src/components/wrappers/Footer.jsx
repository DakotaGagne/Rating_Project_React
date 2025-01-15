/*
Component that displays the footer of the website. 
It contains links to the technologies used in the project, the credits page, and links to the developer's GitHub and personal website.

Props:
    - windowWidth: number - the width of the window
*/
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PersonalLinks from '../helpers/PersonalLinks';
import IconReact from '../icons/IconReact';
import IconNodejs from '../icons/IconNodejs';
import IconBootstrap from '../icons/IconBootstrap';



export default function Footer( { windowWidth } ) {
    const iconSize = "40px";
    const narrowScreen = windowWidth < 576;
    return (
        <Container fluid className="align-items-center border-top font-domine bg-body-tertiary py-3" style={{bottom:"0px"}}>
            <Row>
                {narrowScreen&&<Col xs={12}className="d-flex justify-content-center align-items-center pb-3">
                    <PersonalLinks />

                </Col>}
                <Col xs={6} sm={4} className="d-flex justify-content-start align-items-center">
                    <a href="https://react.dev/" className="text-body-secondary ps-3 hovering">
                        <IconReact width={iconSize} height={iconSize} />
                    </a>
                    <a href="https://nodejs.org/en" className="text-body-secondary ps-1 hovering">
                        <IconNodejs width={iconSize} height={iconSize} />
                    </a>
                    <a href="https://react.dev/" className="text-body-secondary ps-1 hovering">
                        <IconBootstrap width={iconSize} height={iconSize} />
                    </a>
                </Col>
                {!narrowScreen&&<Col sm={4} className="d-flex justify-content-center align-items-center">
                    <PersonalLinks />
                </Col>}
                <Col xs={6} sm={4} className="d-flex justify-content-end align-items-center">
                    <div className="text-body-secondary"> © {new Date().getFullYear()} Ratingly </div>
                </Col>
            </Row>
        </Container>
    )
}