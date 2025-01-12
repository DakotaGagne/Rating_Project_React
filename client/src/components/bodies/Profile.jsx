/*
Component that displays the user's profile page. 
This page displays all of the posts that the user has made. 
If the user double clicks on a post, they will be redirected to the create page with the post they clicked on loaded in the editor. 
This allows the user to edit or delete the post. 
If the user has not made any posts, a message will be displayed to inform the user that they have not made any posts yet.

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PostHorizontal from '../posts/PostHorizontal';
import PostVertical from '../posts/PostVertical';
import authenticate from '../../utils/authenticate';



export default function Profile( { darkMode, user, mobile, windowWidth } ) {
    // State Variables and Constants
    const [posts, setPosts] = useState([]);
    const [highlightedPost, setHighlightedPost] = useState(1);
    const [postClicked, setPostClicked] = useState(false);
    const dblClickTimeout = 500;
    const horizPostMin = 1400; // Used for determining if Horizontal Posts should be displayed

    // useEffect Hooks

    useEffect(() => {
            // Redirect to login page with error if not logged in
            if(user==false)navigate("/login#error");
    }, [user])
    

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
            fetch("http://localhost:3000/api/posts/user", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json",
                    'userid': userData.user.id
                }
            })
            .then(res => {if(res.ok){console.log("res: ", res);return res.json();} else throw new Error("Network response was not ok")})
            .then(data => {
                setPosts(data.posts);
                setHighlightedPost(data.posts[0].id);
            })
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

    return (
        <Container fluid className="font-domine">
            <Row className="pt-4">
                <Col xs={12} className="text-center">
                    <h1 className="fw-bolder">{"Profile Page"}</h1>
                </Col>
                <Col xs={12} className="text-center">
                    <p className="border-bottom pb-2 fs-4">Below is all of your posts that you have made. If you <b><i>'double click'</i></b> on any posts, you can edit or delete them!</p>
                </Col>
            </Row>
            {posts.length>0?
                !mobile&&windowWidth>=horizPostMin?
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
                </Row>
                :null
                
            }
            {posts.length==0&&<Row>
                <Col className="p-5">
                    <Card className="p-5 text-center">
                        <Card.Body>
                            <Card.Title><b>{"You have not made any posts yet!"}</b></Card.Title>
                            <Card.Text><i>{"Click on 'Create A Post' to get started!"}</i></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>}
        </Container>
        
    );

}

