import React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import PosterImage from "./PosterImage";
import { Row } from "react-bootstrap";

export default function PostHorizontal({appSettings:{darkMode}, post, id}) {
    let api_data = JSON.parse(post.api_data);
    return (
        <Container
        fluid
        className={`d-flex my-5 border border-3 rounded border-secondary p-2 ${darkMode?"text-light bg-dark poster-shadow-l":"bg-light text-dark poster-shadow-d"}`}
        >
            <Row>
                <Col>
                    <Row> {/*//* Title and Rating */}
                        <Col
                            className="mt-4 w-100 text-end px-2"
                            style={{
                                fontSize: 40,
                                fontWeight: "bold",
                                letterSpacing: "0.5px",
                                marginRight: 1.5,
                                display: "inline-block",
                            }}
                        >
                            <span style={{fontSize: '3.5vh', fontWeight: "bolder"}}>
                                {post.post_title||""}
                            </span>
                            
                        </Col>
                        <Col

                        >
                            <Rating
                                name={"rating"}
                                value={post.media_rating||""}
                                size={"large"}
                                precision = {0.25}
                                readOnly
                                style={{verticalAlign: "text-bottom"}}
                            />
                        </Col>
                    </Row>
                    <Row> {/*//* Movie Name and Author */}
                        <Col
                            style={{
                                fontSize: 20,
                                fontStyle: "italic",
                                letterSpacing: "0.5px",
                                marginRight: 1.5,
                                display: "inline-block",
                            }}
                        >
                        </Col>
                    </Row>
                    <Row> {/*//* Content */}
                        <Col>
                        </Col>
                    </Row>
                </Col>
                <Col> {/*//* Poster */}
                </Col>
            </Row>
        </Container>
    );
}