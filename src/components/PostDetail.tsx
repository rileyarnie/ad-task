import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  let { postId } = useParams();

  return <div>PostDetail for post {postId}</div>;
};

export default PostDetail;
