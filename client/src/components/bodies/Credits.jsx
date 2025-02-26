/*
Component that displays the main body of the credits page. 
This is a simple organized list of the credits for the project, including contributions, technologies, design, API, and other dependencies.
It also includes links to the personal portfolio, GitHub repository, and other general links for the technologies used in the project.

Props: None
*/
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';



export default function Credits() {
    return (
        <Container>
            <Row>
                <Col xs={0} md={2}></Col>
                <Col xs={12} md={8}>
                    <Card className="p-3 my-5">
                        <Card.Body>
                            <Card.Title className="fs-1">Ratingly Project Credits</Card.Title>
                            <hr/>
                            <Card.Title className="fs-3">Problems/Questions/Concerns?</Card.Title>
                            <Card.Text>If you are having any account or post issues, concerns, or other issues, you may reach me at <a href="mailto:dakotaevan10@gmail.com">dakotaevan10@gmail.com</a>. I recommend you make the Subject <i>"Ratingly Website Issue/Question!"</i></Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">Contributions</Card.Title>
                            <Card.Text>This project was created solely by Dakota Gagne. While testing and suggestions were aided by friends and family, the development, design, and programming was made by me.</Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">Technologies</Card.Title>
                            <Card.Text>This project was created using Postgres, React, Express, and NodeJS Primarily</Card.Text>
                            <Card.Text>Other dependencies were used as well, including Vite, Bcrypt, Js-Cookie, Body Parser, Morgan, and Passport.</Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">Design</Card.Title>
                            <Card.Text>Design was made using a mixture of Bootstrap, Material-UI, and custom CSS.</Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">API</Card.Title>
                            <Card.Text>TMDB was used for movie and tv show data.</Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">Other</Card.Title>
                            <Card.Text>Numerous other small dependencies were used. Feel free to look at the GitHub page for the full code and project data!</Card.Text>
                            <hr/>
                            <Card.Title className="fs-3">Links</Card.Title>
                            <Card.Title >Personal</Card.Title>
                            <Card.Text className="fst-italic"><a href="https://github.com/DakotaGagne/Rating_Project_React">GitHub Repository</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://www.dakotagagne.ca">Personal Portfolio</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://www.linkedin.com/in/dakota-gagne/">LinkedIn</a></Card.Text>
                            <Card.Title>General</Card.Title>
                            <Card.Text className="fst-italic"><a href="https://react.dev">https://react.dev</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://nodejs.org/en">https://nodejs.org/en</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://vite.dev">https://vite.dev</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://www.postgresql.org/">https://www.postgresql.org/</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://getbootstrap.com">https://getbootstrap.com</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://www.passportjs.org">https://www.passportjs.org</a></Card.Text>
                            <Card.Text className="fst-italic"><a href="https://mui.com/material-ui/">https://mui.com/material-ui/</a></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={0} md={2}></Col>
            </Row>
        </Container>
    )
}