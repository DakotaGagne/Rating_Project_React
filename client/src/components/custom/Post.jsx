import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Post({ post }) {
    return (
        <div className="my-5 py-5 text-center w-100">
            <h1>{ "Name: " + post.media_title }</h1>
            <h2>{ "Type: " + post.media_type }</h2>
            <h3>{ "Post Title: " + post.post_title }</h3>
            <h3>{ "Post Author: " + post.post_author }</h3>
            <h4>{ "Post Rating: " + post.media_rating }</h4>
            <p> { "Post Content: " + post.post_content }</p>
            <p> {"User_ID: " + post.user_id} </p>
            <p> {"Post_ID: " + post.id} </p>
        </div>
    )
};


export default Post;