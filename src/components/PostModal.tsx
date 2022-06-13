import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { DropzoneArea } from "react-mui-dropzone";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PostModal: React.FC<Props> = (props) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<any>(null);
  const [chosenFile, setChosenFile] = useState<any>(null);

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
    //create poat in firebase
    //get post id
    //upload image/video
    // get download url for image/video
    const documentRef = await addDoc(collection(db, "posts"), {
      username: "Batman",
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
          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
          {/* <Input id="my-input" aria-describedby="my-helper-text"/> */}
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
            // accept={("image/jpeg", "image/png", "image/bmp", "video/mp4")}
            accept="image/*, video/mp4"
          />
          {/* <DropzoneArea
            dropzoneText={"Drop a file or clck"}
            filesLimit={1}
            maxFileSize={5000000}
            useChipsForPreview
            // onChange={(files, event) => handleChange(files, event)}
            onDrop={(files, event) => handleChange(files, event)}
            acceptedFiles={[
              "image/jpeg",
              "image/png",
              "image/bmp",
              "video/mp4",
            ]}
          /> */}
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
