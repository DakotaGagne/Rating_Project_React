import React, {useState, useEffect} from "react";
import Rating from "@mui/material/Rating";
import PosterImage from "../material-ui/PosterImage";
// import Button from "@mui/material/Button";
import Button from 'react-bootstrap/Button';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {Container, Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import PostHorizontal from "../material-ui/PostHorizontal";


import authenticate from "../../utils/authenticate";
import { usernameFormatter } from "../../utils/formatting";


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

export default function CreatePost({appSettings:{darkMode}, user}) {

    const [editMode, setEditMode] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);


    const [newPost, setNewPost] = useState({
        mediaType: "Movie",
        mediaTitle: "",
        postRating: 0,
        postTitle: "",
        postContent: ""
    });

    useEffect(() => {
        const hash = window.location.hash;
        if(hash.includes("edit")){
            setEditMode(true);
            console.log("Edit Mode");
            let editId = hash.split("=")[1];
            editId = parseInt(editId);
            if (editId) {
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
    

    const [searchResults, setSearchResults] = useState([]);

    const errorDuration = 4000;
    const successDuration = 3000;
    const deleteWarningDuration = 4000;

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteWarning, setDeleteWarning] = useState(false);

    useEffect(() => {if(error!="")setTimeout(() => setError(""), errorDuration)}, [error])
    useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), successDuration)}, [success])
    useEffect(() => {if(deleteWarning)setTimeout(() => setDeleteWarning(false), deleteWarningDuration)}, [deleteWarning])

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

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        // Check authenticated
        if(user==false){
            // setError("You must be logged in to create a post!");
            // setSuccess("");
            // console.log("User not logged in, redirecting to login page",);
            // setTimeout(() => window.location.href = "/login", 3000);
            window.location.href="/login#error";
        } else {
            authenticate().then(data => {setUserData(data.user);});
        }
    }, [user])

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

    function deletePost(){
        //! Need to make this delete the post from the database
        if(deleteWarning){
            console.log("Deleting Post");
        } else {
            setDeleteWarning(true);
        }
    };

    function submitPost(){
        //! Need to make this create new post normally but update existing post if in edit mode
        // media_title, media_type, media_rating, post_title, post_author, user_id, post_content
        if(searchResults.length>=selectedAPI&&newPost.postTitle.length>0&&newPost.postContent.length>0&&newPost.postRating>=0){
            let username = userData?usernameFormatter(userData.username, false):"John Doe";
            let userId = userData?userData.id:1;

            let mediaTypeUppercase = searchResults[selectedAPI].media_type.toLowerCase();
            mediaTypeUppercase = mediaTypeUppercase.charAt(0).toUpperCase() + mediaTypeUppercase.slice(1);
            let newPostData = {
                media_title: searchResults[selectedAPI].title,
                media_type: mediaTypeUppercase,
                media_rating: newPost.postRating,
                post_title: newPost.postTitle,
                post_author: username,
                user_id: userId,
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
            .then(response => {
                if(response.ok){
                    setSuccess("Post Created!");
                    setError("");
                    window.location.reload();
                } else {
                    setError("Error creating post (server side)!");
                    setSuccess("");
                    console.log(response)
                }
            })      
            .catch(err => {
                setError("Error creating post!");
                console.log(err);
            });
        } else {
            let errors = "\n";
            if(searchResults.length<selectedAPI)errors+="No media selected!\n";
            if(newPost.postTitle.length<=0)errors+="No post title!\n";
            if(newPost.postContent.length<=0)errors+="No post content!\n";
            if(newPost.postRating<0)errors+="No rating!\n";
            // alert("Please fill out all fields correctly! Errors:" + errors);
            setError("Please fill out all fields correctly! Errors:" + errors);
        }
    };

    return (
    <div>
        {postToEdit!=null&&
        <Container>
            <Row>
                <Col lg={2} md={3}></Col>
                <Col lg={8} md={6}>
                    <PostHorizontal appSettings={{darkMode}} post={postToEdit} />
                </Col>
                <Col lg={2} md={3}></Col>
            </Row>
        </Container>
        }
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
                        <h1>{`${editMode?"Edit":"Create"} Post`}</h1>

                    </Row>
                    <Row className="my-2">
                        {/* //! Page desc goes here */}
                        {!editMode&&<p>Enter the title for the media, select the correct Movie/TV from the list, then add your title, rating, and post content!</p>}
                        {editMode&&<p>Your current post is displayed above, make any changes below and press 'Update Post' to submit changes!</p>}
                        {editMode&&<p>Alternatively, you can delete the post with the 'Delete Post' button below!</p>}


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
                        <Button variant="primary" className="hovering-no-scale py-3" onClick={submitPost}>{`${editMode?"Update":"Create"} Post`}</Button>
                        {deleteWarning&&<Alert variant="danger" className="mt-3">{`Are you sure you want to delete this post? This action cannot be undone!`}</Alert>}
                        {editMode&&<Button variant="danger" className="hovering-no-scale py-3 mt-2" onClick={deletePost}>{`Delete Post`}</Button>}
                    </Row>
                </Col>
                <Col md={4}>
                    {/* Poster Only */}
                    <PosterImage url={apiInputLabel.poster_path} darkMode={darkMode} create={true}/>
                </Col>
            </Row>
        </Container>
    </div>
    );
}