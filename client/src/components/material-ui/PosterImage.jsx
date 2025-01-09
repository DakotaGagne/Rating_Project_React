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
    return (
        <CardMedia
            image={url}
            alt="Poster"
            className={`poster-def poster-box-shadow ${darkMode.get?"poster-shadow-l":"poster-shadow-d"} ${create?"w-100 h-auto":""}`}
            sx={{
                flexShrink: 0,
                borderRadius: "12px",
            }}
        />
    )
}