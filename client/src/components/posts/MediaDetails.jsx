/*
Component that displays the details of a media item (movie or tv show) in a card format. The card contains the following information:
- Poster image of the media item.
- Title of the media item.
- Release year of the media item.
- Mean score of the media item.
- Overview of the media item.
Component is updated when the post state is updated

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - post: The post object containing the media item details. (post is an object)
*/
import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Row, Col } from 'react-bootstrap';



export default function MediaDetails( { darkMode, post } ) {

  let api_data = post.api_data?JSON.parse(post.api_data):{};
  const smTitleLim = 20;
  const mdTitleLim = 26;
  const lgTitleLim = 33;


  // Create a theme object for the material ui components (Rating component specifically)
  const theme = createTheme({
      palette: {
          mode: darkMode.get?"dark":"light"
      }
  });


  function formattedURL(url){
    // Function to format the URL of the poster image
    if(url==null||url==undefined||url==""||url.includes("null")){
      if(darkMode.get)return "/poster_not_found_dark.jpg";
      return "/poster_not_found_light.jpg";
    }
    return url;
  }


  return (
      <Container
       fluid 
       className={`sticky-top my-5 justify-content-center border border-3 rounded border-secondary font-domine ${darkMode.get?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
       style={{height:"90vh", top:"9vh", overflowY:"scroll"}}
      >
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            {/* Poster image of the media item */}
            <img src={ formattedURL(api_data.poster_path) } alt={(api_data.title||"") + " Poster"} className={`img-fluid mt-3 rounded-4 h-100 ${darkMode.get?"poster-shadow-l":"poster-shadow-d"}`} style={{maxHeight:'45vh', aspectRatio:"2/3"}}/>
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
                {/* Title of the media item */}
                <span className={`${api_data.title.length>lgTitleLim? "fs-5":api_data.title.length>mdTitleLim?"fs-4":api_data.title.length>smTitleLim?"fs-3":"fs-2"} fw-bold`} >
                  {api_data.title + " "}
                </span>
                {/* Release year of the media item */}
                <span className="text-muted fst-italic fs-5">
                  {" " + (api_data.release_date?api_data.release_date.substring(0,4):" ")}
                </span>
              </Box>
              <Box
                className={"mt-2 w-100 text-end px-2 border-bottom border-4" + (darkMode.get?" border-secondary":" border-dark")}
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                {/* Mean score of the media item */}
                <span className={`fs-4 ${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {"Mean Score "}
                </span>
                {/* Total Vote Count of the media item */}
                <span className={`fs-5 ${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {` (${api_data.vote_count||""}) `}
                </span>
                {/* Rating component */}
                <ThemeProvider theme={theme}>
                  <Rating
                    name={"rating"}
                    value={api_data.rating/2||1}
                    size={"medium"}
                    precision = {0.1}
                    readOnly
                    sx={{ verticalAlign: "text-bottom" }}
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
                {/* Overview of the media item */}
                <span className="text-top fs-5">
                  { api_data.overview }
                </span>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
  );
}