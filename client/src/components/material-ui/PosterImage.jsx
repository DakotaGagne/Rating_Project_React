import React from 'react';
import CardMedia from '@mui/material/CardMedia';

function PosterImage(props) {
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