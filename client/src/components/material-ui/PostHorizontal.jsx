/*
Component that displays a post in a horizontal format.
This component is used in the Posts component to display a list of posts. 
The component displays the following: post title, rating, media type, media title, author, content
The component also displays the poster image of the media item. 
The component is clickable and will set the highlighted post to the post id when clicked. 
The component will also apply a filter to the poster image if the post is the highlighted post and the dark mode setting is toggled.

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - post: The post object containing the media item details. (post is an object)
*/
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import PosterImage from "./PosterImage";
import { ThemeProvider, createTheme } from "@mui/material/styles";



export default function PostHorizontal( { darkMode, post, highlightedPost, setHighlightedPost } ) {
  
  let api_data = post.api_data?JSON.parse(post.api_data):{};
  
  // Dark mode theme for the rating component
  const theme = createTheme({
      palette: {
          mode: darkMode.get?"dark":"light"
      }
  });

  // Filter to apply to the poster image if the post is the highlighted post (CSS class)
  let filter = ""
  if(highlightedPost){
    if(post.id==highlightedPost&&darkMode.get){
      filter = "lighten";
    } else if(post.id==highlightedPost&&!darkMode.get){
      filter = "darken";
    }
  }

  return (
    <Card
      className={`d-flex my-5 border border-3 rounded border-secondary ${darkMode.get?"text-light bg-dark poster-shadow-l":"bg-light text-dark poster-shadow-d"} ${filter}`}
      onClick={() => {setHighlightedPost(post.id)}}
    >
      <CardContent sx={{ pr: 2 }} className={`p-2 ${darkMode.get?"poster-shadow-l":"poster-shadow-d"}`}>
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
            {/* Post Title */}
            {post.post_title||""}
          </Box>
          {/* Post Rating */}
          <ThemeProvider theme={theme}>
            <Rating
              name={"rating"}
              value={post.media_rating||""}
              size={"large"}
              precision = {0.25}
              readOnly
              sx={{ verticalAlign: "text-bottom" }}
            />
          </ThemeProvider>
          <Divider className="my-1" />
          <Box
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {/* Media Type and Title */}
            {`${post.media_type}: ${post.media_title}`}
          </Box>
          <Box
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {/* Post Author */}
            {`Author: ${post.post_author}`}
          </Box>
        </Box>
        <Box
          component="p"
          className={`${darkMode.get?"text-secondary":"text-dark"}`}
          sx={{ fontSize: 18, mb: "1.275rem" }}
        >
          {/* Post Content */}
          {post.post_content}
        </Box>
        <Divider className="my-1"/>
      </CardContent>
      <PosterImage url={api_data.poster_path} darkMode={darkMode} />
      
    </Card>
  );
}