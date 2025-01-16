/*
Component that displays the user's profile page. 
This page displays all of the posts that the user has made. 
If the user double clicks on a post, they will be redirected to the create page with the post they clicked on loaded in the editor. 
This allows the user to edit or delete the post. 
Also on this page is a button to delete the user's account. Deletion will include any and all posts made by the user.
If the user has not made any posts, a message will be displayed to inform the user that they have not made any posts yet.

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
    - windowWidth: The current window width of the website (int). Used to determine if the website is being viewed on a mobile device.
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import PostHorizontal from '../posts/PostHorizontal';
import DeleteAccountModal from '../helpers/DeleteAccountModal';
import PostVertical from '../posts/PostVertical';
import authenticate from '../../utils/authenticate';
import LoadingMessage from '../helpers/LoadingMessage';


export default function Profile( { darkMode, user, mobile, windowWidth } ) {
    //SERVER URL
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    // State Variables and Constants
    const [posts, setPosts] = useState([]);
    const [highlightedPost, setHighlightedPost] = useState(1);
    const [postClicked, setPostClicked] = useState(false);
    const [postsLoaded, setPostsLoaded] = useState(false);
    // Error and Success Handling
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const errorTimeout = 5000;
    const successTimeout = 3000;
    
    const dblClickTimeout = 500;
    const horizPostMin = 1400; // Used for determining if Horizontal Posts should be displayed
    const navigate = useNavigate();
    const SERVER_URL = import.meta.VITE_SERVER_URL;

    // useEffect Hooks

    // Clear errors and successes after a certain amount of time
    useEffect(() => {if(error!="")setTimeout(() => setError(""), errorTimeout)}, [error])
    useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), successTimeout)}, [success])
    // Redirect to login page with error if not logged in
    useEffect(() => {
        // Redirect to login page with error if not logged in
        if(user==false)navigate("/login#error");
    }, [user]);
    

    useEffect(() => {
        // Double Click Timeout Function
        if(postClicked){
            setTimeout(() => {
                setPostClicked(false);
            }, dblClickTimeout);
        }
    }, [postClicked])

    useEffect(() => {
        // Check if User is Logged In, if not redirect to login page
        // Fetch Posts for User From Server
        authenticate().then(userData => {
            fetch(`${SERVER_URL}/api/posts/user`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json",
                    'userid': userData.user.id
                }
            })
            .then(res => {if(res.ok){console.log("res: ", res);return res.json()} else throw new Error("Network response was not ok")})
            .then(data => {setPosts(data.posts); setPostsLoaded(true);})
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    function updateHighlightedPost(val){
        // Keep track of highlightedPost Changes to determine double click
        setHighlightedPost(val);
        if(postClicked&&val==highlightedPost){
            // Double Click
            console.log("Double Clicked");
            navigate(`/create#edit=${val}`);
        } else {
            setPostClicked(true);
        }
    }

    const [delModShow, setDelModShow] = useState(false);

    function deleteAccount(){
        // Delete Account
        // Called from the modal in charge of handling confirmation
        // This function should make a request to the server to delete the account, and all posts associated with the account
        console.log("Deleting Account");
        authenticate().then(userData => {
            console.log("User Data: ", userData.user);
            fetch(`${SERVER_URL}/auth/delete`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json",
                    'Authorization': JSON.stringify(userData.user)
                }
            })
            .then(res => {if(res.ok){return res.json()} else throw new Error("Network response was not ok!")})
            .then(data => {
                console.log(data);
                if(data.success){
                    // Logout
                    setSuccess("Account deletion successful! Redirecting to logout page...");
                    if(Cookies.get('localUserJWT'))Cookies.remove('localUserJWT');
                    setTimeout(()=>window.open(`${SERVER_URL}/auth/logout`, "_self"), successTimeout/2);
                } else {
                    setError("Account deletion failed! If this issue persists, please contact support (info in credits page).");
                    throw new Error("Account deletion failed");
                }
            })
        })
        .catch(err => {
            console.log(err);
            setError("Account deletion failed! If this issue persists, please contact support (info in credits page).");
        });
    }


    return (
        <Container fluid className="font-domine">
            <Row className="pt-4">
                <Col xs={12} className="text-center">
                    <h1 className="fw-bolder">{"Profile Page"}</h1>
                </Col>
                <Col xs={12} className="text-center">
                    <p className="border-bottom pb-2 fs-4">Below is all of your posts that you have made. If you <b><i>'double click'</i></b> on any posts, you can edit or delete them! <br/>
                    <i>If you wish to delete your account, please navigate to the bottom of the page and click "Delete Account"</i>
                    </p>
                </Col>
            </Row>
            {!postsLoaded&&<LoadingMessage />}
            {posts.length>0&&
                <div>
                {!mobile&&windowWidth>=horizPostMin?
                // Desktop Mode, Horizontal Posts
                <Row>
                    <Col lg={2} md={3}></Col>
                    <Col lg={8} md={6}>
                        {posts.map((post, index) => {
                            return <PostHorizontal darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={updateHighlightedPost} post={post} key={index}/>
                        })}
                    </Col>
                    <Col lg={2} md={3}></Col>
                </Row>
                :   
                // Mobile Mode, Vertical Posts
                <Row>
                    <Col lg={2} md={0}></Col>
                    <Col lg={8} md={12}>
                        {posts.map((post, index) => {
                            return <PostVertical darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={updateHighlightedPost} post={post} key={index}/>
                        })}
                    </Col>
                    <Col lg={2} md={0}></Col>
                </Row>}
                </div>
                
            }
            {posts.length==0&&postsLoaded&&<Row>
                <Col lg={2} md={0}></Col>
                <Col className="py-5" lg={8} md={12}>
                    <Card className="py-5 text-center">
                        <Card.Body>
                            <Card.Title><b>{"You have not made any posts yet!"}</b></Card.Title>
                            <Card.Text><i>{"Click on 'Create A Post' to get started!"}</i></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} md={0}></Col>
            </Row>}
            <Row className="pb-5">
                <Col lg={2} md={0}></Col>
                <Col lg={8} md={12}>
                    <Card className="py-5 text-center">
                        <Card.Body>
                            <Card.Title><b>{"Delete Account"}</b></Card.Title>
                            <Card.Text><i>{"If you wish to delete your account, click the button below. This action is irreversible."}</i></Card.Text>
                            <Card.Link onClick={()=>setDelModShow(true)} className="btn btn-danger hovering">{"Delete Account"}</Card.Link>
                            <DeleteAccountModal show={delModShow} setShow={setDelModShow} deleteAccount={deleteAccount}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} md={0}></Col>
            </Row>
            {success!=""&&<Alert className="position-fixed alert-fixed my-3" variant="info" onClose={() => setSuccess("")} dismissible>
                <Alert.Heading>{success}</Alert.Heading>
            </Alert>}
            {error!=""&&<Alert className="position-fixed alert-fixed my-3" variant="danger" onClose={() => setError("")} dismissible>
                <Alert.Heading>{error}</Alert.Heading>
            </Alert>}
        </Container>
        
    );

}