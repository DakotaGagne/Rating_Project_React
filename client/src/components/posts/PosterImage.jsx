/*
Component that displays the poster image of a media item. Used in the MediaCard component.

Props:
    - url: URL of the poster image of the media item.
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - create: Used to determine if the component is being used in the create page. (boolean)
*/
import React from 'react';
import CardMedia from '@mui/material/CardMedia';



export default function PosterImage( { url, darkMode, create } ) {
    
    // If the URL is null, undefined, empty, or contains "null", set the URL to the default poster image
    if(url==null||url==undefined||url==""||url.includes("null")){
        if(darkMode.get)url="/poster_not_found_dark.jpg";
        else url="/poster_not_found_light.jpg";
    }

    
    return (
        <CardMedia
            image={url}
            alt="Poster"
            // className={`poster-def poster-box-shadow ${darkMode.get?"poster-shadow-l":"poster-shadow-d"} ${create?"w-100 h-auto":""}`}
            className={`poster-def border border my-1 ms-2 me-1 ${darkMode.get?"border-light":"border-dark"} ${create?"w-100 h-auto":""}`}

            sx={{
                flexShrink: 0,
                borderRadius: "12px",
            }}
        />
    )
}