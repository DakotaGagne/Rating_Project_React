/*
This file is the route for the search endpoint. It uses the TMDB_API_SEARCH function to search for media based on the query parameters.
The search function takes in a media_name and an optional english_only parameter. 
It then calls the TMDB_API_SEARCH function with the media_name and the TMDB_API_KEY environment variable.
The function then sends the result back to the client.
*/

import TMDB_API_SEARCH from "../../utils/TMDB_API_SEARCH.js";

export default function search(req, res) {
    let media_name = req.query.media_name;
    let english_only = req.query.english_only || true;
    
    TMDB_API_SEARCH(media_name, process.env.TMDB_API_KEY, english_only)
        .then(data => {
        res.status(data.status).send(data.err||data.result);
        })
        .catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
}