import React, { useState, useEffect } from 'react';
import PostHorizontal from '../material-ui/PostHorizontal';
import MediaDetails from '../material-ui/MediaDetails';
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

function Posts({ appSettings }){   

    const [posts, setPosts] = useState([]);

    const [highlightedPost, setHighlightedPost] = useState(1);

    useEffect(() => {
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
                    {posts.length>0&&<MediaDetails appSettings={appSettings} post={posts.find(post => post.id==highlightedPost)} id={highlightedPost} />}
                </Col>
                <Col lg={8} md={6}>
                    {posts.map((post, index) => {
                        return <PostHorizontal appSettings={appSettings} highlightedPost={highlightedPost} setHighlightedPost={setHighlightedPost} post={post} key={index}/>
                    })}
                </Col>
            </Row>
        </Container>
        
    );
}




export default Posts;