import React, { useEffect, useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useStyles } from "./AccountView";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const EMAIL_REGEX = 
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export function LoginCard(props) {
  const classes = useStyles();

  let [isRegistering, setIsRegistering] = useState(false);
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [email, setEmail] = useState("");
  let [buttonsDisabled, setButtonsDisabled] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  const auth = props.auth;

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("successful sign in!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setButtonsDisabled(false);

        switch (error) {
          case "auth/wrong-password":
            setErrorMessage("Wrong password!");
          case "auth/timeout":
            setErrorMessage("Timed out. Please try again later.");
            break;
          case "auth/already-initialized":
            window.location.reload();
            break;
        }
      });
  }

  function handleRegister() {
    console.log(password, email);
    setButtonsDisabled(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log("successful registration and sign in!");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (error) {
          case "auth/email-already-in-use":
            setErrorMessage("Email is already registered.");
          case "auth/missing-email":
          case "auth/invalid-email":
            setErrorMessage("Please enter a valid email.");
            break;
          case "auth/weak-password":
            setErrorMessage("Please enter a longer password.");
            break;
        }

        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setButtonsDisabled(false);
      });
  }

  useEffect(x => {
    if (isRegistering) {
      if(!EMAIL_REGEX.test(email))
        setErrorMessage("Please enter a valid email.");
      else if (password.length < 8)
        setErrorMessage("Password length should be 8 characters or more.");
      else if (!PASSWORD_REGEX.test(password))
        setErrorMessage("Password should contain a special character, a number, and a letter.");
      else if (password != confirmPassword)
        setErrorMessage("Passwords don't match!");
      else setErrorMessage("");

      console.log(password, confirmPassword);
    }
  }, [email, confirmPassword, password]);
  useEffect(x => {
    setErrorMessage("");
  }, [isRegistering]);

  return (
    <Card className={classes.loginCard}>
      <CardContent>
        <h2 className={classes.textPrimary}>Login</h2>
        <div style={{ color: "red", margin: "8px", minHeight: "21px" }}>{errorMessage}</div>
        <div className={classes.mBtm}>
          <TextField id="email" label="Email" variant="outlined" type="email"
            onChange={x => setEmail(x.target.value)} value={email} />
        </div>
        <div className={classes.mBtm}>
          <TextField id="password" label="Password" variant="outlined" type="password"
            onChange={x => setPassword(x.target.value)} value={password} />
        </div>
        {isRegistering ?
          <>
            <div className={classes.mBtm}>
              <TextField id="confirmPassword" label="Confirm Password" variant="outlined" type="password"
                onChange={x => setConfirmPassword(x.target.value)} value={confirmPassword} />
            </div>
            <Button variant="contained" onClick={handleRegister} disabled={buttonsDisabled || errorMessage != ""}
              className={classes.mBtm} style={{ marginRight: "16px" }}>
              Register
            </Button>
            <Button className={classes.mBtm} variant="contained" disabled={buttonsDisabled}
              onClick={x => setIsRegistering(false)}>
              Or Login
            </Button>
          </>
          :
          <>
            <Button variant="contained" onClick={handleLogin} disabled={buttonsDisabled}
              className={classes.mBtm} style={{ marginRight: "16px" }}>
              Login
            </Button>
            <Button className={classes.mBtm} variant="contained" disabled={buttonsDisabled}
              onClick={x => setIsRegistering(true)}>
              Or Register
            </Button>
          </>
        }

        <div style={{ marginTop: "16px" }}>
          Forgot password?
        </div>
      </CardContent>
    </Card>
  );
}
