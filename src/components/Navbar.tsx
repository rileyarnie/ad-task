import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Posts App
          </Typography>
          <CreatePost />
          <Button
            color="inherit"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
