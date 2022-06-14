import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
// import video from "../testdata/TestVideo.mp4";

interface Props {
  caption: string;
  fileType: string;
  fileUrl: string;
  timestamp: number;
  username: string;
}

const Post: React.FC<Props> = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="mx-auto">
      <CardHeader
        avatar={<Avatar>BW</Avatar>}
        title={new Date(props.timestamp).toLocaleString()}
      />
      <CardMedia
        height="195"
        src={props.fileUrl}
        controls={props.fileType === "video/mp4" || undefined}
        component={props.fileType === "video/mp4" ? "video" : "img"}
        // alt={{props.fileType !== "video/mp4" ? "video" : null}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <div className=" flex align-middle items-center">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            4 likes
          </Typography>
        </div>
        <div className=" flex align-middle items-center">
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            4 comments
          </Typography>
        </div>
        <Button aria-label="view details" size="small">
          View Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
