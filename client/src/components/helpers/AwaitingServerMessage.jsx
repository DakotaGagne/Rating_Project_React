import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';



export default function AwaitingServerMessage() {
    return (
        <Container fluid className="font-domine">
            <Row>
                <Col lg={2} md={0}></Col>
                <Col className="py-5" lg={8} md={12}>
                    <Card className="py-5 text-center">
                        <Card.Body>
                            <Card.Title className="pb-5 fs-1"><b>{"Awaiting Connection to Server..."}</b></Card.Title>
                            <Card.Text className="mx-2 fs-4"><i>This project is hosted on Render for free, and so the first fetch from the server is delayed because Render has to wake it up first. <br/> It may take up to a minute for it to load, but after it does, subseqent requests made to the server will be very fast!</i></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} md={0}></Col>
            </Row>
        </Container>
    )
}