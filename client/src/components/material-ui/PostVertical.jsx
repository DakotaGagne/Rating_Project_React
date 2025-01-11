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



export default function PostVertical( { darkMode, post, highlightedPost, setHighlightedPost } ) {

  let api_data = post.api_data?JSON.parse(post.api_data):{};

  // Create a theme object for the material ui components (Rating component specifically)
  const theme = createTheme({
      palette: {
          mode: darkMode.get?"dark":"light"
      }
  });

  function formattedURL(url){
    // Function to format the URL of the poster image
    if(url==null||url==undefined||url==""||url.includes("null")){
      if(darkMode.get)return "../../../public/poster_not_found_dark.jpg";
      return "../../../public/poster_not_found_light.jpg";
    }
    return url;
  }

  let filter = ""
  if(highlightedPost){
    if(post.id==highlightedPost&&darkMode.get){
      filter = "lighten";
    } else if(post.id==highlightedPost&&!darkMode.get){
      filter = "darken";
    }
  }


  return (
      <Container
       fluid 
       className={`my-5 justify-content-center border border-3 rounded border-secondary ${darkMode.get?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
       styles={{width:"min-content", height:"min-content"}}
       onClick={()=>setHighlightedPost(post.id)}
      >
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            {/* Poster image of the media item */}
            <img src={ formattedURL(api_data.poster_path) } alt={(api_data.title||"") + " Poster"} className={`img-fluid mt-3 rounded-4 h-100 ${darkMode.get?"poster-shadow-l":"poster-shadow-d"}`} style={{maxHeight:'40vh', aspectRatio:"2/3"}}/>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} className="d-flex justify-content-center">
            <Box>
              <Box
                className="mt-4 w-100 px-2 text-center"
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                {/* Title of the post */}
                <span className="fs-2 fw-bold" >
                  {post.post_title||""}
                </span>
              </Box>
              <Box
                className="mt-2 w-100 px-2 text-center"
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                
                {/* Author */}
                <span className={`fs-4 ${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {`Author: ${post.post_author||""}`}
                </span>
              </Box>
              <Box
                className="mt-2 w-100 px-2 text-center"
                sx={{
                  letterSpacing: "1px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >

                {/* Media Type and Title */}
                <span className={`fs-4 fst-italic ${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {`${api_data.title||""} `}
                </span>
                <span className={`fs-5 fst-italic ${darkMode.get?"text-muted":"text-dark"} text-top`}>
                  {` ${api_data.release_date?"("+api_data.release_date.substring(0,4)+") ":""}`}
                </span>
                {/* Rating component */}
                {/* Rating */}
                <ThemeProvider theme={theme}>
                  <Rating
                    name={"rating"}
                    value={post.media_rating||0}
                    size={"medium"}
                    precision={0.1}
                    sx={ { verticalAlign:"text-bottom" } }
                    readOnly
                  />
                </ThemeProvider>

              </Box>
              <Box
                className="mt-4 w-100 px-2 pb-5 text-center"
                sx={{
                  letterSpacing: "0.5px",
                  marginRight: 1.5,
                }}
              >
                {/* Overview of the media item */}
                <span className="text-top fs-5">
                  { post.post_content }
                </span>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
  );
}