import React, { useState, useEffect } from 'react';
import Post from './Post';

function Posts(){   

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div>
            {posts.map((post, index) => {
                return <Post key={index} post={post} />
            })}
        </div>
        
    )
}



export default Posts;