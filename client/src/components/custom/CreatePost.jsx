import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import PosterImage from "./PosterImage";
import Container from "react-bootstrap/Container";

// Credit (www.brighttv.co.th)


export default function PostHorizontal({appSettings:{darkMode}, post, id, setHighlightedPost}) {
  let api_data = post.api_data?JSON.parse(post.api_data):{};

    /**
     * Currently adapted from PostHorizontal.jsx
     * Want it to look the same but have different content
     * Slider for Movie/TV Show (or some sort of obv flip option)
     * Want Movie title search bar and drop down for searching
     *  The format should be Movie: [Search Bar]
     *  Movie should change to TV Show if TV Show is selected (useEffect)
     *  Dropdown beside the search bar that auto selects the first option
     *  Every time the search bar is changed, the dropdown should update (API) (useEffect)
     *  Everytime the dropdown is changed, the poster should update (useEffect)
     *  The poster should be displayed beside on the far right (like post horizontal)
     *  The title for the post should go below (max char lim that makes sense for the format of post horiz)
     *  Rating should be beside the title
     *  Author is auto selected based on the username of the user
     *  Content should be below the title (textarea, max char lim of maybe 500)
     */

    const [mediaType, setMediaType] = useState("Movie");
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch API for search results
        // Set search results
    }, [searchValue, mediaType]);

    useEffect(() => {
        // Fetch API for poster
        // Set poster
        //! Might not need to do this if the poster URL is set to searchResults[0].poster_path
        // Try above first, use this otherwise
    }, [searchResults]);



  return (
    <Container>
        <Card
        className={`d-flex my-5 border border-3 rounded border-secondary ${darkMode?"text-light bg-dark poster-shadow-l":"bg-light text-dark poster-shadow-d"}`}
        onClick={() => {setHighlightedPost(post.id)}}
        >
            <CardContent sx={{ pr: 2 }} className={`p-2 ${darkMode?"poster-shadow-l":"poster-shadow-d"}`}>
                <Box mb={1}>
                    {/* add box and divider for Movie/Tv Show slider */}
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
                    {/* {post.post_title||""} // Change to search bar */}
                </Box>
                <Rating
                    name={"rating"}
                    value={post.media_rating||""}
                    size={"large"}
                    precision = {0.25}
                    readOnly
                    sx={{ verticalAlign: "text-bottom" }}
                /> 
                {/* Add box for dropdown instead of rating */}
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
                    {/* {`${post.media_type}: ${post.media_title}`}  Change to media title */}
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
                    {/* {`Author: ${post.post_author}`} Change box to rating */}
                </Box>
                </Box>
                <Box
                component="p"
                className={`${darkMode?"text-secondary":"text-dark"}`}
                sx={{ fontSize: 18, mb: "1.275rem" }}
                >
                {/* {post.post_content} still to be content, but need it as a textarea */}
                </Box>

                <Divider className="my-1"/>
            </CardContent>
            <PosterImage url={api_data.poster_path} darkMode={darkMode} />
            
        </Card>
    </Container>
  );
}