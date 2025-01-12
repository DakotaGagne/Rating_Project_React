/*
Component that displays the main body of the Posts page.
Fetches the posts from the server and displays them in a horizontal list on the right side of the screen.
Clicking on a post will display the details of the post on the left side of the screen. (By default the first post is displayed)

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MediaDetails from '../posts/MediaDetails';
import PostHorizontal from '../posts/PostHorizontal';
import PostVertical from '../posts/PostVertical';



export default function Posts( { darkMode, mobile, windowWidth } ){   

    // State Variables
    const [posts, setPosts] = useState([]);
    const [highlightedPost, setHighlightedPost] = useState(1);

    const horizPostMin = 1400; // Used for determining if Horizontal Posts should be displayed
    const mediaDetailsMin = 992; // Used for determining if media details should be displayed

    const postMax = 30; // Maximum number of posts to display

    useEffect(() => {
        // Fetch Posts from Server
        fetch("http://localhost:3000/api/posts")
            .then(res => res.json())
            .then(data => {
                if(data.posts.length>postMax)data.posts=data.posts.slice(0, postMax);
                setPosts(data.posts);
                setHighlightedPost(data.posts[0].id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    
    return (
        <Container fluid className="font-domine">
            {/* 
            3 Modes
            1. Desktop full - Media Details on Left, Horiz Posts on the right. Media Details is 4, Horiz Posts is 8
            2. Desktop small - Media Details on left, Vert Posts on the right. Media Details is 5, Vert Posts is 7
            3. Mobile - No Media Details, Vert Posts only. Vert Posts is 12
            */}
            {
            mobile || windowWidth < mediaDetailsMin ?
                // Mobile Mode, No Media Details
                <Row>
                    <Col>
                        {posts.map((post, index) => {
                            return <PostVertical darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={setHighlightedPost} post={post} key={index}/>
                        })}
                    </Col>
                </Row>
            :
            windowWidth >= mediaDetailsMin && windowWidth < horizPostMin ?
                // Desktop Small Mode, Media Details on Left (5), Vert Posts on Right (7)
                <Row>
                    <Col lg={5}>
                        {posts.length>0&&<MediaDetails smallMode={true} darkMode={darkMode} post={posts.find(post => post.id==highlightedPost)} id={highlightedPost} mobile={mobile} windowWidth={windowWidth} />}
                    </Col>
                    <Col lg={7}>
                        {posts.map((post, index) => {
                            return <PostVertical mediaDetails={true} darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={setHighlightedPost} post={post} key={index}/>
                        })}
                    </Col>
                </Row>
                
            :
                // Desktop Full Mode, Media Details on Left (4), Horiz Posts on Right (8)
                <Row>
                    <Col lg={5}>
                            {posts.length>0&&<MediaDetails darkMode={darkMode} post={posts.find(post => post.id==highlightedPost)} id={highlightedPost} mobile={mobile} windowWidth={windowWidth} />}
                    </Col>
                    <Col lg={7}>
                        {posts.map((post, index) => {
                            return <PostHorizontal mediaDetails={true} darkMode={darkMode} highlightedPost={highlightedPost} setHighlightedPost={setHighlightedPost} post={post} key={index}/>
                        })}
                    </Col>
                </Row>
            }
        </Container>
        
    );
}