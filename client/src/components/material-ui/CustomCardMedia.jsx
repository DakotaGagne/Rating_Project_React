import React from 'react';
import CardMedia from '@mui/material/CardMedia';

function CustomCardMedia() {
    return (
        <CardMedia
        image={
            `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/720/480`
        }
        sx={{
            width:"30%",
            aspectRatio: "1/1",
            height: "30%",
            flexShrink: 0,
            backgroundColor: "grey.200",
            borderRadius: "12px",
            boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
        }}
      />
    )
}

export default CustomCardMedia;