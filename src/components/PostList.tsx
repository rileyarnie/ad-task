import Box from "@mui/material/Box";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Box pt={8} className=" bg-slate-100 space-y-4 px-2">
      {posts.map((item) => (
        <Post
          key={item.id}
          fileUrl={item.data().fileUrl}
          caption={item.data().caption}
          timestamp={item.data().timestamp?.toDate()}
          fileType={item.data().fileType}
          username={item.data().username}
        />
      ))}
    </Box>
  );
};

export default PostList;
