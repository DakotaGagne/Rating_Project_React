/*
Component that displays the main body of the Posts page.
Fetches the posts from the server and displays them in a horizontal list on the right side of the screen.
Clicking on a post will display the details of the post on the left side of the screen. (By default the first post is displayed)

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/
import React, { useState, useEffect } from 'react';
import PostHorizontal from '../material-ui/PostHorizontal';
import MediaDetails from '../material-ui/MediaDetails';
import { Container, Row, Col } from 'react-bootstrap';



function Posts({ darkMode, mobile }){   

    // State Variables
    const [posts, setPosts] = useState([]);
    const [highlightedPost, setHighlightedPost] = useState(1);

    useEffect(() => {
        // Fetch Posts from Server
        fetch("http://localhost:3000/api/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts);
                setHighlightedPost(data.posts[0].id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    
    return (
        <Container fluid>
            <Row>
                <Col lg={4} md={6}>
                    {posts.length>0&&<MediaDetails darkMode={darkMode} post={posts.find(post => post.id==highlightedPost)} id={highlightedPost} />}
                </Col>
                <Col lg={8} md={6}>
                    {posts.map((post, index) => {
                        return <PostHorizontal darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={setHighlightedPost} post={post} key={index}/>
                    })}
                </Col>
            </Row>
        </Container>
        
    );
}




export default Posts;