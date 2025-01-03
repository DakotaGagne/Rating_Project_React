import React, {useState, useEffect} from "react";
import Rating from "@mui/material/Rating";
import PosterImage from "../material-ui/PosterImage";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import cssBaseline from "@mui/material/CssBaseline";
import {Container, Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

/**
 * TODO: Make the inputs and buttons, etc fit the entire height that it can
 * TODO: Input and dropdown should be taller than they need to be (too skinny rn)
 * TODO: Make the post content take up the remaining space
 * TODO: Right side for button?
 * TODO: Fix ratings light and darkmode to use the built in modes with material-ui (on all pages)
 * TODO: Make this upload to database
 * TODO: Error and Success messages for the user
 * TODO: Require to be logged in, redirect to login page if not
 * TODO: Errors occur when the API is unreachable. Need to handle this
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

export default function CreatePost({appSettings:{darkMode}}) {
    let api_data = {};

    const [searchResults, setSearchResults] = useState([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {if(error!="")setTimeout(() => setError(""), 4000);}, [error])
    useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), 3000);}, [success])

    const [selectedAPI, setSelectedAPI] = useState(-1);
    const [apiInputLabel, setAPIInputLabel] = useState({
        value: "",
        index: "",
        poster_path: ""
    });

    const theme = createTheme({
        palette: {
            mode: darkMode?"dark":"light"
        }
    });


    useEffect(() => {
        // Check authenticated
        console.log("Checking if authenticated...");
        fetch("http://localhost:3000/user/authenticated")
        .then(res => res.json())
        .then(data => {
            if(data.authenticated){
                console.log("Authenticated!");
            } else {
                console.log("Not Authenticated!");
            }
        })
        
    }, [])

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
            setSelectedAPI(0);
        } else {
            setAPIInputLabel({
                value: "",
                index: "",
                poster_path: ""
            });
            setSelectedAPI(-1);
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
        if(newPost.mediaTitle.length>0){
            fetch(`http://localhost:3000/api/search?media_name=${newPost.mediaTitle}&&media_type=${newPost.mediaType}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                    console.log(data);
                })
        }
    }, [newPost.mediaTitle, newPost.mediaType]);

    function submitPost(){
        // media_title, media_type, media_rating, post_title, post_author, user_id, post_content
        if(searchResults.length>=selectedAPI&&newPost.postTitle.length>0&&newPost.postContent.length>0&&newPost.postRating>=0){
            let mediaTypeUppercase = searchResults[selectedAPI].media_type.toLowerCase();
            mediaTypeUppercase = mediaTypeUppercase.charAt(0).toUpperCase() + mediaTypeUppercase.slice(1);
            let newPostData = {
                media_title: searchResults[selectedAPI].title,
                media_type: mediaTypeUppercase,
                media_rating: newPost.postRating,
                post_title: newPost.postTitle,
                post_author: "John Doe",
                user_id: 1,
                post_content: newPost.postContent,
                api_data: JSON.stringify(searchResults[selectedAPI])
            }
            fetch("http://localhost:3000/api/create_post", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPostData),
            })
            .then(response => response.ok?alert("Post Created!")&&window.location.reload():alert("Error creating post (server side)!")&&console.log(response))
            .catch(err => {
                alert("Error creating post!");
                console.log(err);
            });
        } else {
            let errors = "\n";
            if(searchResults.length<selectedAPI)errors+="No media selected!\n";
            if(newPost.postTitle.length<=0)errors+="No post title!\n";
            if(newPost.postContent.length<=0)errors+="No post content!\n";
            if(newPost.postRating<0)errors+="No rating!\n";
            alert("Please fill out all fields correctly! Errors:" + errors);
        }
    };

    return (
        <Container
            fluid
            className={`d-flex flex-column my-5 justify-content-center border border-3 rounded border-secondary ${darkMode?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
            
        >
            <Row>
                <Col md={8}>
                    {/* Main Body of input */}

                    
                    <Row className="mt-3">
                        {/* //! Page title goes here (and error success alerts) */}
                        {error!=""&&<Alert className="mt-2 mb-3 py-2" variant="danger">{error}</Alert>}
                        {success!=""&&<Alert className="mt-2, mb-3 py-2" variant="info">{success}</Alert>}
                        <h1>Create Post</h1>

                    </Row>
                    <Row className="my-2">
                        {/* //! Page desc goes here */}
                        <p>Enter the title for the media, select the correct Movie/TV from the list, then add your title, rating, and post content!</p>
                    </Row>
                    <Row className="my-5">
                        <Col md={6}>
                            {/* Media Name */}
                            <input
                                className={`h-100 w-100`}
                                name="mediaTitle" 
                                type="text" 
                                value={newPost.mediaTitle} 
                                onChange={updateNewPost} 
                                placeholder="Search for Media..."
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
                    <Row className="my-5">
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
                            <ThemeProvider theme={theme}>
                                <Rating
                                    name={"postRating"}
                                    value={newPost.mediaRating}
                                    onChange={updateNewPost}
                                    size={"large"}
                                    precision = {1}
                                    sx={{ verticalAlign: "text-bottom" }}
                                />
                            </ThemeProvider>
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
                    <Row className="mt-5 pt-5">
                        <Col>
                        {/* Submit Button */}
                        <Button variant="contained" onClick={submitPost}>Create Post</Button>
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
