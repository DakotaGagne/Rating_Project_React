import React, { useState, useEffect } from 'react';
import PostHorizontal from '../material-ui/PostHorizontal';
import MediaDetails from '../material-ui/MediaDetails';
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import authenticate from '../../utils/authenticate';

export default function Profile({ user, appSettings, updateAppSettings, mobile }) {
    const [posts, setPosts] = useState([]);
    const [highlightedPost, setHighlightedPost] = useState(1);
    const [postClicked, setPostClicked] = useState(false);
    const dblClickTimeout = 500;
    useEffect(() => {
        if(postClicked){
            setTimeout(() => {
                setPostClicked(false);
            }, dblClickTimeout);
        }
    }, [postClicked])

    function updateHighlightedPost(val){
        // Keep track of highlightedPost Changes to determine double click
        setHighlightedPost(val);
        if(postClicked&&val==highlightedPost){
            // Double Click
            console.log("Double Clicked");
            window.location.href=`/create#edit=${val}`;
        } else {
            setPostClicked(true);
        }
    }
    useEffect(() => {
        // Check if User is Logged In, if not redirect to login page
        if(!user)window.location.href="/login#error";
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
    return (
        <Container fluid>
            <Row className="pt-4">
                <Col xs={12} className="text-center">
                    <h1>Profile Page</h1>
                </Col>
                <Col xs={12} className="text-center">
                    <p className="border-bottom pb-2">Below is all of your posts that you have made. If you double click on any posts, you can edit or delete them!</p>
                </Col>
            </Row>
            {posts.length>0&&<Row>
                <Col lg={2} md={3}></Col>
                <Col lg={8} md={6}>
                    {posts.map((post, index) => {
                        return <PostHorizontal appSettings={appSettings} highlightedPost={highlightedPost} setHighlightedPost={updateHighlightedPost} post={post} key={index}/>
                    })}
                </Col>
                <Col lg={2} md={3}></Col>
            </Row>}
            {posts.length==0&&<Row>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>You have not made any posts yet!</Card.Title>
                            <Card.Text>Click on "Create A Post" to get started!</Card.Text>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>}
        </Container>
        
    );

}

