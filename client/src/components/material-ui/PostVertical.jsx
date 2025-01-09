/*
Component that displays the details of a media item in a vertical format.
Used for mobile mode
This is the alternative to postHorizontal but contains a little bit of api data (media type and title) because mobile mode does not have mediaDetails component.
! Work in progress!!!!!!
! The component is not yet complete and is only a placeholder for now.


Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - post: The post object containing the media item details. (post is an object)
*/
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Row, Col } from 'react-bootstrap';



export default function MediaDetails( { darkMode, post } ) {

  let api_data = post.api_data?JSON.parse(post.api_data):{};

  const theme = createTheme({
      palette: {
          mode: darkMode.get?"dark":"light"
      }
  });

  function formattedOverview(overview){
    const charLimit = 290;
    if (overview){
      if (overview.length > charLimit){
        return overview.substring(0,charLimit) + "...";
      } else {
        return overview;
      }
    } else {
      return "";
    }
  }

  return (
      <Container
       fluid 
       className={`sticky-top my-5 justify-content-center border border-3 rounded border-secondary ${darkMode.get?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
       style={{height:"90vh", top:"5vh"}}>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <img src={ api_data.poster_path||"" } alt={(api_data.title||"") + " Poster"} className={`img-fluid mt-3 rounded-4 h-100 ${darkMode.get?"poster-shadow-l":"poster-shadow-d"}`} style={{maxHeight:'40vh', aspectRatio:"2/3"}}/>
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
                <span style = {{fontSize: '2.5vh', fontWeight: "Normal"}} className={`${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {"Mean Score "}
                </span>
                <span style = {{fontSize: '1.5vh'}} className={`${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {` (${api_data.vote_count||""}) `}
                </span>
                <ThemeProvider theme={theme}>
                  <Rating
                    name={"rating"}
                    value={api_data.rating/2||1}
                    size={"medium"}
                    precision = {0.1}
                    readOnly
                    sx={{ verticalAlign: "text-top" }}
                  />
                </ThemeProvider>
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
                  {formattedOverview(api_data.overview)}
                </span>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
  );
}
