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

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PostModal: React.FC<Props> = (props) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<any>(null);

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCaption(event.target.value);
  };

  const handleChange = (files: any) => {
    setFile(files[0]);
  };

  const handleSubmit = () => {
    const postData = { caption, fileName: file.name, fileType: file.type };
    console.log(postData);
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
          {/* <Input
            id="my-input"
            aria-describedby="my-helper-text"
            placeholder=""
            type="file"
            onChange={(event) => handleFileChange(event)}
          /> */}
          <DropzoneArea
            dropzoneText={"Drop a file or clck"}
            filesLimit={1}
            maxFileSize={5000000}
            useChipsForPreview
            onChange={handleChange}
            acceptedFiles={[
              "image/jpeg",
              "image/png",
              "image/bmp",
              "video/mp4",
            ]}
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
