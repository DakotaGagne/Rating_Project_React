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
    - appSettings: The app settings of the website (object). Used to determine the current dark mode setting.
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/

import React, {useState, useEffect} from "react";
import Rating from "@mui/material/Rating";
import PosterImage from "../material-ui/PosterImage";
import Button from 'react-bootstrap/Button';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {Container, Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import PostHorizontal from "../material-ui/PostHorizontal";
import Form from 'react-bootstrap/Form';
import authenticate from "../../utils/authenticate";
import postManipulation from "../../utils/post-management";



export default function CreatePost({ appSettings:{darkMode}, user, mobile }) {

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


    // Specifically used to enable light and dark mode in the rating component
    const theme = createTheme({palette:{mode: darkMode?"dark":"light"}});
    
    useEffect(() => {
        // Check for edit mode
        // Called only on page load
        // If edit mode, fetch the post to be edited and populate the form with its data
        const hash = window.location.hash;
        if(hash.includes("edit")){
            setEditMode(true);
            console.log("Edit Mode");
            let editId = parseInt(hash.split("=")[1]);
            if (editId) {
                // Confirm authentication, use the user id to get the post data
                authenticate().then(userData => {
                    fetch(`http://localhost:3000/api/posts/id`, {
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
                        console.log("Post to Edit", post);
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
        if(user==false)window.location.href="/login#error";
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
            fetch(`http://localhost:3000/api/search?media_name=${newPost.mediaTitle}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                })
        }
    }, [newPost.mediaTitle, newPost.mediaType]);

    function checkForm(){
        // Checks that all form fields are filled out correctly, if not adds the errors to the error var
        if(searchResults.length>=selectedAPI&&newPost.postTitle.length>0&&newPost.postContent.length>0&&newPost.postRating>=0){
            return true;
        }
        let errors = "\n";
        if(searchResults.length<selectedAPI)errors+="No media selected!\n";
        if(newPost.postTitle.length<=0)errors+="No post title!\n";
        if(newPost.postContent.length<=0)errors+="No post content!\n";
        if(newPost.postRating<0)errors+="No rating!\n";
        setError("Please fill out all fields correctly! Errors:" + errors);
        return false;
    }

    function manipulatePost(method){
        // Creates, Updates, and Deletes Posts
        // See utils/post-management.js for more details
        if(method=="create"&&checkForm())postManipulation.create(authenticate, newPost, searchResults[selectedAPI], setSuccess, setError, successDuration);
        if(method=="update"&&checkForm())postManipulation.update(authenticate, newPost, postToEdit.id, searchResults[selectedAPI], setSuccess, setError, successDuration);
        if(method=="delete"){
            if(deleteWarning)postManipulation.delete(authenticate, postToEdit, setSuccess, setError, successDuration);
            else setDeleteWarning(true);
        }
    }
    


    return (
    <div>
        {postToEdit!=null&&<Container>
            <Row>
                <Col lg={2} md={3} /><Col lg={8} md={6}>
                    <PostHorizontal appSettings={{darkMode}} post={postToEdit} />
                </Col><Col lg={2} md={3} />
            </Row>
        </Container>}
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
                        {success!=""&&<Alert className="mb-2 py-2" variant="info">{success}</Alert>}
                        <h1>{`${editMode?"Edit":"Create"} Post`}</h1>

                    </Row>
                    
                    {/* //! Page desc goes here */}
                    {!editMode&&<Row><p>{`Enter the title for the media, select the correct Movie/TV from the list, then add your title, rating, and post content!`}</p></Row>}
                    {editMode&&<Row><p>{`Your current post is displayed above, make any changes below and press 'Update Post' to submit changes!`}<br/>{`Alternatively, you can delete the post with the 'Delete Post' button below!`}</p></Row>}
                    
                    <Form>
                        <Row>
                            <Col md={6}>
                                {/* Media Name */}
                                <Form.Group>
                                    <Form.Label><b>Media Name</b></Form.Label>
                                    <Form.Control
                                        className={`h-100 w-100`}
                                        size="lg"
                                        name="mediaTitle"
                                        value={newPost.mediaTitle} 
                                        onChange={updateNewPost}
                                        placeholder="Search for Media..."
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Dropdown Selector */}
                                <Form.Group>
                                    <Form.Label><b>Select Media</b></Form.Label>
                                    <Form.Select
                                        className={`h-100 w-100`}
                                        name="apiSelect"
                                        size="lg"
                                        value={apiInputLabel.index}
                                        onChange={updateSelectedAPI}
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
                                    <Form.Label><b>Post Title</b></Form.Label>
                                    <Form.Control 
                                        className={`h-100 w-100`}
                                        size="lg"
                                        name="postTitle" 
                                        type="postTitle" 
                                        placeholder="Enter Post Title..."
                                        value={newPost.postTitle}
                                        onChange={updateNewPost}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Post Rating */}
                                <Form.Group>
                                    <Form.Label><b>Rating</b></Form.Label>
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
                                        className={`w-100 h-100`}
                                        style={{resize: "none"}}
                                        value={newPost.postContent}
                                        placeholder="What did you think of it?"
                                        onChange={updateNewPost}
                                        name="postContent"
                                        as="textarea"
                                        size="lg"
                                        rows="5"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                {/* Error and Success Alerts, and Create, Update, Delete Buttons */}
                                {error!=""&&<Alert className="mt-2 mb-3 py-2" variant="danger">{error}</Alert>}
                                {success!=""&&<Alert className="mb-3 py-2" variant="info">{success}</Alert>}
                                {!editMode&&<Button variant="primary" className="hovering-no-scale py-3" onClick={()=>manipulatePost("create")}>{`Create Post`}</Button>}
                                {editMode&&<Button variant="primary" className="hovering-no-scale py-3" onClick={()=>manipulatePost("update")}>{`Update Post`}</Button>}
                                {deleteWarning&&<Alert variant="danger" className="mt-3">{`Are you sure you want to delete this post? This action cannot be undone!`}</Alert>}
                                {editMode&&<Button variant="danger" className="hovering-no-scale py-3 mt-2" onClick={()=>manipulatePost("delete")}>{`Delete Post`}</Button>}
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md={4}>
                    {/* Poster */}
                    <PosterImage url={apiInputLabel.poster_path} darkMode={darkMode} create={true}/>
                </Col>
            </Row>
        </Container>
    </div>
    );
}