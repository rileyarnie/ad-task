import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PostModal: React.FC<Props> = (props) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<any>(null);
  const [chosenFile, setChosenFile] = useState<any>(null);

  const currentUser = useContext(AuthContext).currentUser;

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (!target.files) {
      return;
    }
    setChosenFile(target.files[0]);

    const fileReader = new FileReader();
    fileReader?.readAsDataURL(target.files[0]);
    fileReader.onload = (event) => {
      setFile(event.target?.result);
    };
  };

  const handleSubmit = async () => {
    const documentRef = await addDoc(collection(db, "posts"), {
      username: currentUser.displayName,
      caption,
      fileType: chosenFile.type,
      timestamp: serverTimestamp(),
    });

    const fileRef = ref(storage, `posts/${documentRef.id}/image`);

    await uploadString(fileRef, file, "data_url")
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "posts", documentRef.id), {
          fileUrl: downloadURL,
        });
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <DialogContentText>Caption</DialogContentText>
        <FormControl className="space-y-4">
          <TextField
            onChange={(event) => handleCaptionChange(event)}
            autoFocus
            margin="dense"
            id="name"
            label="Add description"
            type="text"
            fullWidth
            variant="outlined"
            name="file"
            required
          />
          <input
            id="my-input"
            aria-describedby="my-helper-text"
            placeholder=""
            type="file"
            onChange={(event) => handleFileChange(event)}
            accept="image/*, video/mp4"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
