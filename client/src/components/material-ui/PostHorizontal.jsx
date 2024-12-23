import React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import CustomCardMedia from "./CustomCardMedia";

// Credit (www.brighttv.co.th)


export default function PostHorizontal({appSettings:{darkMode}, post, id}) {
  return (
    <Card
      elevation={0}
      className={`d-flex my-5 border border-3 rounded border-secondary ${darkMode?"text-light bg-dark":"bg-light text-dark"} p-2 `}
    >
      <CardContent sx={{ pr: 2 }}>
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {post.post_title||""}
          </Box>
          <Rating
            name={"rating"}
            value={post.media_rating||""}
            size={"large"}
            precision = {0.25}
            readOnly
            sx={{ verticalAlign: "text-bottom" }}
          />
          <Divider className="my-1" />
          <Box
            component="h3"
            className=""
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {`${post.media_type}: ${post.media_title}`}
          </Box>
          <Box
            component="h3"
            className=""
            sx={{
              fontSize: 20,
              fontStyle: "italic",
              letterSpacing: "0.5px",
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {`Author: ${post.post_author}`}
          </Box>
        </Box>
        <Box
          component="p"
          sx={{ fontSize: 18, color: "grey.500", mb: "1.275rem" }}
        >
          {post.post_content}
        </Box>

        <Divider className="my-1"/>
      </CardContent>
      <CustomCardMedia />
      
    </Card>
  );
}