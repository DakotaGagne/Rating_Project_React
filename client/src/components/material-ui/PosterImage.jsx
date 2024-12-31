import React from 'react';
import CardMedia from '@mui/material/CardMedia';

function PosterImage(props) {
    if (props.url === "") {
        props.url == 'https://fakeimg.pl/200x600?text=No+Poster+Found&font=noto&font_size=20'
        console.log("No Poster Found")
    }
    return (
        <CardMedia
            image={props.url}
            className={`poster-def poster-box-shadow ${props.darkMode?"poster-shadow-l":"poster-shadow-d"} ${props.create?"w-100 h-100":""}`}
            sx={{
                flexShrink: 0,
                borderRadius: "12px",
            }}
      />
    )
}

export default PosterImage;