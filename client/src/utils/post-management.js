import { usernameFormatter } from './formatting';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

/*

Helper functions for CreatePost.jsx
Used to Create, Update, and Delete Posts
Takes the necessary inputs and sends a fetch request to the server to perform the desired action

Mostly in its own file to reduce the size of CreatePost.jsx

Returns an object with the following functions:
- delete: Used to delete a post
- update: Used to update a post
- create: Used to create a post

*/


const postManipulation = {
    delete: (authenticate, postToEdit, setSuccess, setError, successDuration)=>{
        // Authenticate user and delete post from database
        let postId = postToEdit.id;
        authenticate().then(userData => {
            fetch(`${SERVER_URL}/api/delete_post`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId:userData.user.id, postId:postId}),
            }).then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    throw new Error("Error deleting post (server side)!");
                }
            }).then(data => {
                setSuccess("Post Deleted Successfully!");
                setError("");
                setTimeout(() => window.location.href='/profile', successDuration);
            })
            .catch(err => {
                setError("Error deleting post!");
                console.log(err);
            });
        });
    },
    update: (authenticate, newPost, prevPostId, selectedMediaAPI, setSuccess, setError, successDuration)=>{
        let mediaTypeUppercase = selectedMediaAPI.media_type.toLowerCase();
        mediaTypeUppercase = mediaTypeUppercase.charAt(0).toUpperCase() + mediaTypeUppercase.slice(1);
        // Authenticate user and update post in database
        authenticate().then(userData => {
            let newPostData = {
                media_title: selectedMediaAPI.title,
                media_type: mediaTypeUppercase,
                media_rating: newPost.postRating,
                post_title: newPost.postTitle,
                post_author: usernameFormatter(userData.user.username, false),
                user_id: userData.user.id,
                post_content: newPost.postContent,
                api_data: JSON.stringify(selectedMediaAPI)
            }
            fetch(`${SERVER_URL}/api/update_post`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({prevPostId:prevPostId,  newPostData:newPostData}),
            })
            .then(res => {
                if(res.ok){
                    setSuccess("Post Updated Successfully! Page will now reload...");
                    setError("");
                    setTimeout(()=>window.location.reload(), successDuration);
                } else {
                    setError("Error updating post (server side)!");
                    setSuccess("");
                }
            })
            
        })
        .catch(err => {
            setError("Error updating post!");
            console.log(err);
        });
    },
    create: (authenticate, newPost, selectedMediaAPI, setSuccess, setError, successDuration)=>{
        let mediaTypeUppercase = selectedMediaAPI.media_type.toLowerCase();
        mediaTypeUppercase = mediaTypeUppercase.charAt(0).toUpperCase() + mediaTypeUppercase.slice(1);
        // Authenticate user and create post in database
        authenticate().then(userData => {
            console.log("User Data", userData);
            let newPostData = {
                media_title: selectedMediaAPI.title,
                media_type: mediaTypeUppercase,
                media_rating: newPost.postRating,
                post_title: newPost.postTitle,
                post_author: usernameFormatter(userData.user.username, false),
                user_id: userData.user.id,
                post_content: newPost.postContent,
                api_data: JSON.stringify(selectedMediaAPI)
            }
            fetch(`${SERVER_URL}/api/create_post`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPostData),
            })
            .then(response => {
                if(response.ok){
                    setSuccess("Post Created! Reloading page...");
                    setError("");
                    setTimeout(() => window.location.reload(), successDuration);
                } else{
                    setError("Error creating post (server side)!");
                    setSuccess("");
                }
            })   
        })   
        .catch(err => {
            setError("Error creating post!");
            console.log(err);
        });
    }
}

export default postManipulation;