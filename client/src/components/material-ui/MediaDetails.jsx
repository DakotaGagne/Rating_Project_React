import React, { useState, useEffect } from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import PosterImage from "./PosterImage";

import { Container, Row, Col } from 'react-bootstrap';

export default function MediaDetails({appSettings:{darkMode}, post}) {

  const [media_details, setMediaDetails] = React.useState([]);

  let api_data = post.api_data?JSON.parse(post.api_data):{};

  const charLimit = 313;

  useEffect(() => {
    fetch("http://localhost:3000/api/search?media_name=Rick%20and%20Morty")
        .then(res => res.json())
        .then(data => {
            setMediaDetails(data.results);
        })
        .catch(err => {
            console.log(err);
        });
  }, []);

  return (
      <Container
       fluid 
       className={`sticky-top my-5 justify-content-center border border-3 rounded border-secondary ${darkMode?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
       style={{height:"90vh", top:"5vh"}}>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <img src={ api_data.poster_path||"" } alt={(api_data.title||"") + " Poster"} className={`img-fluid mt-3 rounded-4 ${darkMode?"poster-shadow-l":"poster-shadow-d"}`} style={{width:'65%'}}/>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <Box>
              <Box
                className="mt-4 w-100 text-end px-2"
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                <span style = {{fontSize: '3.5vh', fontWeight: "bolder"}}>
                  {api_data.title + " "}
                </span>
                <span className="text-muted" style={{fontSize: '2.2vh', fontStyle: "italic"}}>
                  {" " + (api_data.release_date?api_data.release_date.substring(0,4):" ")}
                </span>
              </Box>
              <Box
                className="mt-2 w-100 text-end px-2 border-bottom border-4"
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                <span style = {{fontSize: '2.5vh', fontWeight: "Normal"}} className={`${darkMode?"text-muted":"text-dark"} text-top`}>
                  {"Mean Score "}
                </span>
                <span style = {{fontSize: '1.5vh'}} className={`${darkMode?"text-muted":"text-dark"} text-top`}>
                  {` (${api_data.vote_count||""}) `}
                </span>
                <Rating
                  name={"rating"}
                  value={api_data.rating/2||1}
                  size={"medium"}
                  precision = {0.1}
                  readOnly
                  sx={{ verticalAlign: "text-top" }}
                />
              </Box>
              <Box
                className="mt-4 w-100 text-end px-2"
                sx={{
                  letterSpacing: "0.5px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                <span style = {{fontSize: '2.2vh', fontWeight: "Normal"}} className="text-top">
                  {api_data.overview.length>charLimit?api_data.overview.substring(0,charLimit)+"...":api_data.overview}
                </span>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
  );
}
