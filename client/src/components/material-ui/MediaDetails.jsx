import React, { useState, useEffect } from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import CustomCardMedia from "./CustomCardMedia";

import { Container, Row, Col } from 'react-bootstrap';

// Credit (www.brighttv.co.th)
const media_data = {
  "Title": ""
}

export default function MediaDetails({appSettings:{darkMode}, post}) {

  const [media_details, setMediaDetails] = React.useState([]);

  useEffect(() => {
    console.log("Fetching media details");
    fetch("http://localhost:3000/api/search?media_name=Rick%20and%20Morty")
        .then(res => res.json())
        .then(data => {
            setMediaDetails(data.results.slice(0, 5));
        })
        .catch(err => {
            console.log(err);
        });
  }, []);
  useEffect(() => {
    console.log(media_details[0]);
  }, [media_details]);




  return (
      <Container fluid className={`sticky-top my-5 justify-content-center border border-3 rounded border-secondary`} style={{height:"90vh", top:"5vh"}}>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <img src={ "https://posters.movieposterdb.com/22_03/1/13880104/t_13880104_29fc33be.jpg"} alt="Media" className="w-50 img-fluid mt-3 rounded-4" />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <h1>Content here</h1>
          </Col>
        </Row>
      </Container>
  );
}


function old(){
  return (
    <Card
      elevation={0}
      className={`d-flex my-5 border border-4 rounded border-secondary justify-content-center ${appSettings.darkMode?"text-light bg-dark":"bg-light text-dark"} p-2`}
      >
      <CardContent sx={{ pr: 2 }}>
        <CustomCardMedia />
        <Divider className="my-1" />
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {post.post_title}
          </Box>
          <Rating
            name={"rating"}
            value={post.media_rating}
            size={"large"}
            precision = {0.25}
            readOnly
            sx={{ verticalAlign: "text-bottom" }}
          />
          <Divider className="my-1" />
          <Box
            component="h3"
            className=""
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {`${post.media_type}: ${post.media_title}`}
          </Box>
          <Box
            component="h3"
            className=""
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {`Author: ${post.post_author}`}
          </Box>
        </Box>
        <Box
          component="p"
          sx={{ fontSize: 18, color: "grey.500", mb: "1.275rem" }}
        >
          {post.post_content}
        </Box>

        <Divider className="my-1"/>
      </CardContent>
      
    </Card>
  )
}