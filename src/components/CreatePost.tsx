import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import PostModal from "./PostModal";
import Tooltip from "@mui/material/Tooltip";

const CreatePost = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Create new post">
        <IconButton
          aria-label="create new post"
          color="inherit"
          onClick={handleOpen}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <PostModal open={open} handleClose={handleClose} />
    </>
  );
};

export default CreatePost;
