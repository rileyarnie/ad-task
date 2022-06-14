import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [displayNameError, setDisplayNameError] = useState({
    isError: false,
    message: "",
  });

  const [authError, setAuthError] = useState({
    isError: false,
    message: "",
  });

  const { dispatch } = useContext(AuthContext);

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

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
    setDisplayNameError({ isError: false, message: "" });
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

    if (login) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
          const user = userCredentail.user;
          dispatch({ type: "LOGIN", payload: user });
          return navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          return setAuthError({ isError: true, message: errorMessage });
        });
    }
    if (displayName.trim() === "") {
      return setDisplayNameError({
        isError: true,
        message: "username required",
      });
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // await setDoc(doc(db, "users", newUser.user.uid), {
      //   displayName,
      // });
      await updateProfile(newUser.user, { displayName });
      return navigate("/");
    } catch (error) {
      const errorMessage = error.message;

      return setAuthError({ isError: true, message: errorMessage });
    }
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className=" grid place-items-center bg-slate-400"
    >
      <Card sx={{ minWidth: 275, maxWidth: 450, padding: "1rem" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign={"center"}>
            {login ? "LOGIN" : "Register"}
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
            {!login && (
              <>
                <TextField
                  id="displayName"
                  label="username"
                  variant="outlined"
                  type="text"
                  name="displayName"
                  onChange={(event) => handleDisplayNameChange(event)}
                  error={displayNameError.isError}
                  helperText={displayNameError.message}
                />
              </>
            )}
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
            {login ? "Login" : "Register"}
          </Button>
        </CardActions>
        <p
          className="text-center text-sm text-blue-500 cursor-pointer"
          onClick={() => setLogin(!login)}
        >
          {login
            ? "No Account? Register here"
            : "Already Have an account? Login"}
        </p>
      </Card>
    </div>
  );
};

export default Login;
