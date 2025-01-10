import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';




export default function LinearProgressWithLabel(props) {
    const [color, setColor] = React.useState('primary');
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate"  style={{}} {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" className={`${props.darkMode?"text-light":"text-dark"} ${props.chars>props.maxChars*0.8?"text-danger":props.chars<props.minChars?"text-danger":""}`}>
            {`${Math.round(props.chars)} Chars`}
          </Typography>
        </Box>
      </Box>
    );
  }