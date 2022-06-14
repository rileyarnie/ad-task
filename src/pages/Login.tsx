import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });

  const [authError, setAuthError] = useState({
    isError: false,
    message: "",
  });

  const navigate = useNavigate();

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    setEmailError({ isError: false, message: "" });
    setAuthError({ isError: false, message: "" });
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    setPasswordError({ isError: false, message: "" });
    setAuthError({ isError: false, message: "" });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    if (email.trim() === "") {
      return setEmailError({
        isError: true,
        message: "email required",
      });
    }
    if (password.trim() === "") {
      return setPasswordError({ isError: true, message: "Password required" });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        const user = userCredentail.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError({ isError: true, message: errorMessage });
      });
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className=" grid place-items-center bg-slate-400"
    >
      <Card sx={{ minWidth: 275, maxWidth: 450, padding: "1rem" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign={"center"}>
            LOGIN
          </Typography>
          <form className=" flex flex-col space-y-4" onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="email"
              variant="outlined"
              type="text"
              name="email"
              onChange={(event) => handleEmailChange(event)}
              error={emailError.isError}
              helperText={emailError.message}
            />
            <TextField
              id="password"
              label="password"
              variant="outlined"
              type="password"
              name="password"
              onChange={(event) => handlePasswordChange(event)}
              error={passwordError.isError}
              helperText={passwordError.message}
            />
          </form>
          {authError.isError && (
            <div className="mt-2">
              <Typography variant="body2" color="red">
                {authError.message}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            fullWidth
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
