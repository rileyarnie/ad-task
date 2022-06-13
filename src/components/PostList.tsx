import Box from "@mui/material/Box";
import React from "react";
import Post from "./Post";

const PostList = () => {
  return (
    <Box pt={8} className=" bg-slate-100 space-y-4 px-2">
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default PostList;
