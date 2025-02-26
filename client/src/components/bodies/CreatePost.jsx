/*
Component that displays the main body of the CreatePost page. 
The main body contains a form to create a new post. 
The form contains inputs for the media name, media type, post title, post rating, and post content. 
The form also contains a button to submit the post. 
If the user is in edit mode (triggered by having #edit=num hash), the form will be pre-filled with the post data and will contain a button to update the post and a button to delete the post. 
Note that the server has a check to make sure that the user signed in is the owner of the post before allowing the user to edit or delete the post.
The form also contains a poster image of the media selected from the search results.
The search results are fetched from the TMDB Public API when the media name input is changed.

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/

import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme, Rating, LinearProgress } from "@mui/material";
import {Container, Col, Row, Form, Button, Alert} from "react-bootstrap";
import { clean } from 'profanity-cleaner';
import PosterImage from "../posts/PosterImage";
import PostHorizontal from "../posts/PostHorizontal";
import PostVertical from "../posts/PostVertical";
import authenticate from "../../utils/authenticate";
import postManipulation from "../../utils/postManipulation";
import AwaitingServerMessage from "../helpers/AwaitingServerMessage";



export default function CreatePost( { darkMode, user, mobile, windowWidth, serverConn } ) {
    //SERVER URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    
    // States
    const [editMode, setEditMode] = useState(false); // Determines if the user is in edit mode and adjusts the form accordingly
    const [postToEdit, setPostToEdit] = useState(null); // The post to edit if the user is in edit mode
    
    // The new post data to submit (tied to the forms)
    const [newPost, setNewPost] = useState({
        mediaType: "Movie",
        mediaTitle: "",
        postRating: 0,
        postTitle: "",
        postContent: ""
    });

    const [searchResults, setSearchResults] = useState([]); // The search results from the TMDB API
    const [selectedAPI, setSelectedAPI] = useState(-1); // The selected API from the search results (chosen by the user when using the select element of the form. Also set to 0 if the search results are updated)
    // The API input label to display in the form
    const [apiInputLabel, setAPIInputLabel] = useState({value: "", index: "", poster_path: ""}); 
    
    const [error, setError] = useState(""); // The error alert message to display (element only appears if this is not "")
    const errorDuration = 4000; // The duration of the error alert

    const [success, setSuccess] = useState(""); // The success alert message to display (element only appears if this is not "")
    const successDuration = 3000; // The duration of the success alert

    const [deleteWarning, setDeleteWarning] = useState(false); // The delete warning alert message to display (element only appears if this is true)
    const deleteWarningDuration = 4000; // The duration of the delete warning alert

    const [progressBarColor, setProgressBarColor] = useState("info"); // The color of the progress bar in the form

    const [mobileMode, setMobileMode] = useState(mobile); // If user on mobile or width is less than minimum width

    // Form input ranges
    const title_range = [5, 50];
    const content_range = [75, 800];

    // Window Width Minimum for displaying the poster image
    const windowWidthMin = 992;

    // Specifically used to enable light and dark mode in the rating component
    const theme = createTheme({palette:{mode: darkMode.get?"dark":"light"}});

    // Function to set the current URL location
    const navigate = useNavigate();
    // Current URL location
    const location = useLocation();
    
    // Profanity exceptions
    const wordExceptions = ["poop", "hell", "xxx", "crap", "funny", "darn", "dang", "fart"];

    // Button Pressed Variable to ensure the user doesn't press the button multiple times
    let buttonPressed = false;

    useEffect(() => {
        // Set to mobileMode if the user is on mobile or the window width is less than the minimum width
        if(windowWidthMin)setMobileMode(mobile||windowWidth<windowWidthMin);
        else setMobileMode(mobile);
    }, [mobile, windowWidth])

    useEffect(() => {
        // Set the progress bar color based on the length of the post content
        if(newPost.postContent.length>=content_range[1]*0.99)setProgressBarColor("error");
        else if(newPost.postContent.length<content_range[0])setProgressBarColor("error");
        else if(newPost.postContent.length>=content_range[1]*0.7)setProgressBarColor("warning");
        else setProgressBarColor("info");
    }, [newPost.postContent])


    useEffect(() => {
        // Check for edit mode
        // Called only on page load
        // If edit mode, fetch the post to be edited and populate the form with its data
        const hash = location.hash;
        if(hash.includes("edit")){
            setEditMode(true);
            let editId = parseInt(hash.split("=")[1]);
            if (editId) {
                // Confirm authentication, use the user id to get the post data
                authenticate().then(userData => {
                    fetch(`${SERVER_URL}/api/posts/id`, {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': "application/json",
                            'userid': userData.user.id,
                            'postid': editId
                        }
                    })
                    .then(res => {if(res.ok)return res.json(); else throw new Error("Network response was not ok")})
                    .then(data => {
                        let post = data.post;
                        setPostToEdit(post);
                        setNewPost({
                            mediaType: post.media_type,
                            mediaTitle: post.media_title,
                            postRating: post.media_rating,
                            postTitle: post.post_title,
                            postContent: post.post_content
                        });
                    })
                })
            }
        }
    }, []);
    

    // Below watches for changes in the below states, and sets a timeout to set them to "" after the duration
    useEffect(() => {if(error!="")setTimeout(() => setError(""), errorDuration)}, [error])
    useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), successDuration)}, [success])
    useEffect(() => {if(deleteWarning)setTimeout(() => setDeleteWarning(false), deleteWarningDuration)}, [deleteWarning])



    useEffect(() => {
        // Redirect to login page with error if not logged in
        if(user==false)navigate("/login#error");
    }, [user])

    function updateSelectedAPI(e){
        // Update the selected API when the user selects a new one
        setSelectedAPI(e.target.value);
        setAPIInputLabel({
            value: searchResults[e.target.value].title,
            index: e.target.value,
            poster_path: searchResults[e.target.value].poster_path
        });
    }

    useEffect(() => {
        // Update the API input label when the search results change
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

    // Update the new post data when the user types in the form (used for all inputs other than the API select)
    const updateNewPost = (e) => setNewPost({...newPost, [e.target.name]: e.target.value});

    useEffect(() => {
        // Fetch API for search results
        // Set search results
        if(newPost.mediaTitle.length>0){
            fetch(`${SERVER_URL}/api/search?media_name=${newPost.mediaTitle}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                })
        }
    }, [newPost.mediaTitle, newPost.mediaType]);

    useEffect(() => {
        if(error!="")buttonPressed=false;
    }, [error])

    function checkForm(){
        // Checks that all form fields are filled out correctly, if not adds the errors to the error var
        // Profanity Cleaner
        newPost.postTitle = clean(newPost.postTitle, {exceptions: wordExceptions});
        newPost.postContent = clean(newPost.postContent, {exceptions: wordExceptions});
        if(searchResults.length>=selectedAPI&&
            selectedAPI>=0&&
            newPost.postTitle.length>=title_range[0]&&
            newPost.postTitle.length<=title_range[1]&&
            newPost.postContent.length>=content_range[0]&&
            newPost.postContent.length<=content_range[1]&&
            newPost.postRating>=0){
            return true;
        }
        let errors = "";
        if(searchResults.length<selectedAPI||selectedAPI<0)errors="No media selected!";
        else if(newPost.postTitle.length<=0)errors="No post title!";
        else if(newPost.postContent.length<=0)errors="No post content!";
        else if(newPost.postTitle.length<title_range[0]||newPost.postTitle.length>title_range[1])errors=`Post title must be between ${title_range[0]} and ${title_range[1]} characters!`;
        else if(newPost.postContent.length<content_range[0]||newPost.postContent.length>content_range[1])errors=`Post content must be between ${content_range[0]} and ${content_range[1]} characters!`;
        else if(newPost.postRating<0)errors="No rating!";
        setError(errors);
        return false;
    }

    function checkSubmit(e){
        // Check if user pressed enter, if so, submit the form data
        if(e.key=="Enter")manipulatePost(editMode?"update":"create");
    }

    function manipulatePost(method){
        // Creates, Updates, and Deletes Posts
        // See utils/post-management.js for more details
        if(buttonPressed)return;
        if(method=="delete"&&deleteWarning||method=="create"||method=="update")buttonPressed=true;
        if(method=="create"&&checkForm())postManipulation.create(authenticate, newPost, searchResults[selectedAPI], setSuccess, setError, successDuration);
        if(method=="update"&&checkForm())postManipulation.update(authenticate, newPost, postToEdit.id, searchResults[selectedAPI], setSuccess, setError, successDuration);
        if(method=="delete"){
            if(deleteWarning)postManipulation.delete(authenticate, postToEdit, setSuccess, setError, successDuration, navigate);
            else setDeleteWarning(true);
        }
    }
    


    return (
        <div className="font-domine" style={{minHeight:"80vh"}}>
        {success!=""&&<Alert className="position-fixed alert-fixed my-3" variant="info" onClose={() => setSuccess("")} dismissible>
            <Alert.Heading>{success}</Alert.Heading>
               
        </Alert>}
        {error!=""&&<Alert className="position-fixed alert-fixed my-3" variant="danger" onClose={() => setError("")} dismissible>
            <Alert.Heading>{error}</Alert.Heading>
        </Alert>}
        {serverConn&&postToEdit!=null&&<Container className={`d-flex flex-column my-5 justify-content-center ${!mobileMode&&"border border-3 rounded border-secondary"} ${!mobileMode?darkMode.get?"card-shadow-l":"card-shadow-d":""} ${darkMode.get?"text-light bg-dark":"bg-light text-dark"}`} >
            <Row>
                <Col lg={2} md={3} /><Col lg={8} md={6}>
                    {/* Post Example if in Edit Mode */}
                    { mobileMode?
                    // Mobile Mode
                    <PostVertical darkMode={darkMode} post={postToEdit} mobile={mobile} windowWidth={windowWidth} />
                    :
                    // Desktop Mode
                    <PostHorizontal darkMode={darkMode} post={postToEdit} mobile={mobile} windowWidth={windowWidth} />
                    }
                    </Col><Col lg={2} md={3} />
            </Row>
        </Container>}
        <Container
            fluid
            className={`d-flex flex-column my-5 justify-content-center border border-3 rounded border-secondary ${darkMode.get?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`} 
            style={{
                backgroundImage: mobileMode&&apiInputLabel.poster_path?`url(${apiInputLabel.poster_path})`:"",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Row
                style={{backgroundColor: mobileMode&&apiInputLabel.poster_path?"rgba(0,0,0,0.75)":""}}
            >
                {serverConn?
                    <Col lg={8}>
                    {/* Main Body of input */}                    
                    <Row className="mt-3">
                        {/* Page Title */}
                        <h1>{`${editMode?"Edit":"Create"} Post`}</h1>
                    </Row>
                    {/* Page Description */}
                    {!editMode&&<Row>
                        <p className="fs-5">
                            Enter the title for the Movie/Tv Show, select the correct one from the list, then add your title, rating, and post content!
                        </p></Row>}
                    {editMode&&<Row>
                        <p className="fs-5">
                            Your current post is displayed above, make any changes below and press 'Update Post' to submit changes!<br/>Alternatively, you can delete the post with the 'Delete Post' button below!
                        </p></Row>}
                    
                    <Form>
                        <Row>
                            <Col md={6}>
                                {/* Media Name */}
                                <Form.Group>
                                    <Form.Label className="fs-4 fw-bold">Movie/TV Name</Form.Label>
                                    <Form.Control
                                        className={`h-100 w-100`}
                                        size="lg"
                                        name="mediaTitle"
                                        value={newPost.mediaTitle} 
                                        onChange={updateNewPost}
                                        placeholder="Search for Media..."
                                        style={{opacity:mobileMode&&apiInputLabel.poster_path?0.75:1}}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Dropdown Selector */}
                                <Form.Group>
                                    <Form.Label className="fs-4 fw-bold">Select Movie/TV</Form.Label>
                                    <Form.Select
                                        className={`h-100 w-100`}
                                        name="apiSelect"
                                        size="lg"
                                        value={apiInputLabel.index}
                                        onChange={updateSelectedAPI}
                                        style={{opacity:mobileMode&&apiInputLabel.poster_path?0.75:1}}
                                    >
                                        {searchResults.map((val, index) => {
                                        return <option key={index} value={index} onChange={updateSelectedAPI}>{`${val.title} ${val.release_date.substring(0,4)}`}</option>
                                    })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col md={4}>
                                {/* Post Title */}
                                <Form.Group>
                                    <Form.Label className="fs-4 fw-bold">Post Title</Form.Label>
                                    <Form.Control 
                                        className={`h-100 w-100`}
                                        size="lg"
                                        name="postTitle" 
                                        type="postTitle" 
                                        placeholder="Enter Post Title..."
                                        value={newPost.postTitle}
                                        onChange={updateNewPost}
                                        onKeyDown={checkSubmit}
                                        style={{opacity:mobileMode&&apiInputLabel.poster_path?0.75:1}}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Post Rating */}
                                <Form.Group>
                                    <Form.Label className="fs-4 fw-bold">Rating</Form.Label>
                                    <br/>
                                    <ThemeProvider theme={theme}>
                                        <Rating
                                            className="fs-1"
                                            name="postRating"
                                            value={newPost.postRating}
                                            onChange={updateNewPost}
                                        />
                                    </ThemeProvider>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                {/* Post Content Text Area */}
                                <Form.Group>
                                    <Form.Label><b>Post Content</b></Form.Label>
                                    <Form.Control
                                        className={`w-100 h-100 mb-2`}
                                        style={{resize: "none", opacity:mobileMode&&apiInputLabel.poster_path?0.75:1}}
                                        value={newPost.postContent}
                                        placeholder="What did you think of it?"
                                        onChange={updateNewPost}
                                        name="postContent"
                                        as="textarea"
                                        maxLength={content_range[1]}
                                        size="lg"
                                        rows="5"
                                        onKeyDown={checkSubmit}
                                    />
                                </Form.Group>
                                <LinearProgress 
                                    variant="determinate"
                                    value={newPost.postContent.length/content_range[1]*100} 
                                    color={progressBarColor} 
                                    className={"mx-4"}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={12} className="pb-3">
                                {/* Error and Success Alerts, and Create, Update, Delete Buttons */}
                                {!editMode&&<Button variant="primary" className="hovering-no-scale py-3 w-100" onClick={()=>{if(success=="")manipulatePost("create")}}>{`Create Post`}</Button>}
                                {editMode&&<Button variant="primary" className="hovering-no-scale py-3 w-100" onClick={()=>{if(success=="")manipulatePost("update")}}>{`Update Post`}</Button>}
                                {deleteWarning&&<Alert variant="danger" className="mt-3 w-100">{`Are you sure you want to delete this post? This action cannot be undone!`}</Alert>}
                                {editMode&&<Button variant="danger" className="hovering-no-scale py-3 mt-2 w-100" onClick={()=>{if(success=="")manipulatePost("delete")}}>{`Delete Post`}</Button>}
                            </Col>
                        </Row>
                    </Form>
                    </Col>
                :
                    <AwaitingServerMessage />
                }
                {!mobileMode&&serverConn&&
                // Desktop Mode
                <Col md={4}>
                    {/* Poster */}
                    <PosterImage url={apiInputLabel.poster_path} darkMode={darkMode} create={true}/>
                </Col>
                }
            </Row>
        </Container>
        </div>
    );
}