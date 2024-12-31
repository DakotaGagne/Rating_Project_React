import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import PosterImage from "../material-ui/PosterImage";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {Container, Col, Row} from "react-bootstrap";

/**
 * TODO: Make the inputs and buttons, etc fit the entire height that it can
 * TODO: Input and dropdown should be taller than they need to be (too skinny rn)
 * TODO: Make the post content take up the remaining space
 * TODO: Right side for button?
 * TODO: Fix ratings light and darkmode to use the built in modes with material-ui (on all pages)
 * TODO: Make this upload to database
 * TODO: Error and Success messages for the user
 * TODO: Require to be logged in, redirect to login page if not
 */

let post = {
    api_data: {},
    post_title: "",
    media_rating: "",
    media_type: "",
    media_title: "",
    post_author: "",
    post_content: "",
    id: ""
}

export default function PostHorizontal({appSettings:{darkMode}}) {
    let api_data = {};
    // if(typeof post!=="undefined"){
    //     api_data = JSON.parse(post.api_data)
    // }
    

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

    // const [mediaType, setMediaType] = useState("Movie");
    // const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [selectedAPI, setSelectedAPI] = useState(-1);
    const [apiInputLabel, setAPIInputLabel] = useState({
        value: "",
        index: "",
        poster_path: ""
    });

    function updateSelectedAPI(e){
        setSelectedAPI(e.target.value);
        setAPIInputLabel({
            value: searchResults[e.target.value].title,
            index: e.target.value,
            poster_path: searchResults[e.target.value].poster_path
        });
    }

    useEffect(() => {
        if(searchResults.length>0){
            setAPIInputLabel({
                value: searchResults[0].title,
                index: 0,
                poster_path: searchResults[0].poster_path
            });
        } else {
            setAPIInputLabel({
                value: "",
                index: "",
                poster_path: ""
            });
        }
    }, [searchResults]);

    const [newPost, setNewPost] = useState({
        mediaType: "Movie",
        mediaTitle: "",
        postRating: 0,
        postTitle: "",
        postContent: ""
    });

    function updateNewPost(e){
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        // Fetch API for search results
        // Set search results
        if(newPost.mediaTitle.length>0&&newPost.mediaType.length>0){
            fetch(`http://localhost:3000/api/search?media_name=${newPost.mediaTitle}&&media_type=${newPost.mediaType}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                    console.log(data);
                })
        }
    }, [newPost.mediaTitle, newPost.mediaType]);

    // useEffect(() => {
    //     // Fetch API for poster
    //     // Set poster
    //     //! Might not need to do this if the poster URL is set to searchResults[0].poster_path
    //     // Try above first, use this otherwise
    // }, [searchResults]);


    return (
        <Container
            fluid
            className={`h-100 my-5 justify-content-center border border-3 rounded border-secondary ${darkMode?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
            
        >
            <Row>
                <Col md={8}>
                    {/* Main Body of input */}
                    <Row className="my-3">
                        {/* //! Page title goes here */}
                        <h1>Create Post</h1>
                    </Row>
                    <Row className="my-3">
                        {/* //! Page desc goes here */}
                        <p>Enter the title for the media, select the correct Movie/TV from the list, then add your title, rating, and post content!</p>
                    </Row>
                    <Row className="my-3">
                        <Col md={4}>
                            {/* Media Name */}
                            <input
                                className={`h-100 w-100`}
                                name="mediaTitle" 
                                type="text" 
                                value={newPost.mediaTitle} 
                                onChange={updateNewPost} 
                                placeholder="Media Title:" 
                            />
                        </Col>
                        <Col md={4}>
                            {/* Dropdown Selector */}
                            <select
                                className={`h-100 w-100`}
                                name="apiSelect"
                                value={apiInputLabel.index}
                                onChange={updateSelectedAPI}
                            >
                                {searchResults.map((val, index) => {
                                    return <option key={index} value={index} onChange={updateSelectedAPI}>{`${val.title} ${val.release_date.substring(0,4)}`}</option>
                                })}

                            </select>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={4}>
                            {/* Rating */}
                            <input
                                className={`h-100 w-100`}
                                name="postTitle" 
                                type="text" 
                                value={newPost.postTitle} 
                                onChange={updateNewPost} 
                                placeholder="Post Title:" 
                            />
                        </Col>
                        <Col md={4}>
                            {/* Rating */}
                            <Rating
                                name={"postRating"}
                                value={newPost.mediaRating}
                                onChange={updateNewPost}
                                size={"large"}
                                precision = {1}
                                sx={{ verticalAlign: "text-bottom" }}
                            />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                            {/* Content */}
                            <textarea 
                                className={`w-100`}
                                name="postContent" 
                                onChange={updateNewPost} 
                                value={newPost.postContent} 
                                placeholder="Post Content:"
                                rows={5}
                            /> 
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                        {/* Submit Button */}
                        <Button variant="contained">Create Post</Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    {/* Poster Only */}
                    <PosterImage url={apiInputLabel.poster_path} darkMode={darkMode} create={true}/>
                </Col>
            </Row>
        </Container>
    );
}





/*


<FormControl fullWidth>
    <InputLabel>{apiInputLabel.lable}</InputLabel>
    <Select
        labelId="apiSelect"
        value={apiInputLabel.index}
        label="Age"
        onChange={updateSelectedAPI}
    >
        {searchResults.map((val, index) => {
            return <MenuItem key={index} value={index} onChange={updateSelectedAPI}>{`${val.title} ${val.release_date.substring(0,4)}`}</MenuItem>
        })}
    </Select>
</FormControl>


<FormControl fullWidth>
    <InputLabel>{apiInputLabel.label}</InputLabel>
        <Select
            labelId="apiSelect"
            value={apiInputLabel.index}
            label="apiSelect"
            onChange={updateSelectedAPI}
        >
        {searchResults.map((val, index) => {
            return <MenuItem key={index} value={index} onChange={updateSelectedAPI}>{`${val.title} ${val.release_date.substring(0,4)}`}</MenuItem>
        })}
    </Select>






<Card
            className={`d-flex my-5 border border-3 rounded border-secondary ${darkMode?"text-light bg-dark poster-shadow-l":"bg-light text-dark poster-shadow-d"}`}
            onClick={() => {post.id?setHighlightedPost(post.id):""}}
            >
                <CardContent sx={{ pr: 2 }} className={`p-2 ${darkMode?"poster-shadow-l":"poster-shadow-d"}`}>
                    <Box mb={1}>
            //         <Box
            //             component="h3"
            //             sx={{
            //             fontSize: 30,
            //             fontWeight: "bold",
            //             letterSpacing: "0.5px",
            //             marginRight: 1.5,
            //             display: "inline-block",
            //             }}
            //         >
            //             <input name="mediaTitle" type="text" value={newPost.mediaTitle} onChange={updateNewPost} placeholder="Media Title:" /> 
            //             <FormControl fullWidth>
            //                 <InputLabel>{apiInputLabel.lable}</InputLabel>
            //                 <Select
            //                     labelId="apiSelect"
            //                     value={apiInputLabel.index}
            //                     label="Age"
            //                     onChange={updateSelectedAPI}
            //                 >
            //                     {searchResults.map((val, index) => {
            //                         return <MenuItem key={index} value={index} onChange={updateSelectedAPI}>{`${val.title} ${val.release_date.substring(0,4)}`}</MenuItem>
            //                     })}
            //                 </Select>
            //             </FormControl>
            //         </Box>
            
            //         <Divider className="my-1" />
            //         <Box
            //             sx={{
            //             fontSize: 20,
            //             fontStyle: "italic",
            //             letterSpacing: "0.5px",
            //             marginRight: 1.5,
            //             display: "inline-block",
            //             }}
            //         >
            //         </Box>
            //         <Rating
            //             name={"postRating"}
            //             value={newPost.mediaRating}
            //             onChange={updateNewPost}
            //             size={"large"}
            //             precision = {0.5}
            //             sx={{ verticalAlign: "text-bottom" }}
            //         />
            //         </Box>
            //         <Box
            //         component="p"
            //         className={`${darkMode?"text-secondary":"text-dark"}`}
            //         sx={{ fontSize: 18, mb: "1.275rem" }}
            //         >
            //         <textarea 
            //             name="postContent" 
            //             onChange={updateNewPost} 
            //             value={newPost.postContent} 
            //             placeholder="Post Content:" 
            //         /> 
            //         </Box>

            //         <Divider className="my-1"/>
            //     </CardContent>
            //     <PosterImage url={apiInputLabel.poster_path} darkMode={darkMode} />
                
            // </Card>




//  */