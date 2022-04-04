import React, { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useStyles } from "./AccountView";

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
        switch(error) {
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

  return (
    <Card className={classes.loginCard}>
      <CardContent>
        <h2 className={classes.textPrimary}>Login</h2>
        <div style={{color: "red", margin: "12px"}}>{errorMessage}</div>
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
            <Button variant="contained" onClick={handleRegister} disabled={buttonsDisabled}
              className={classes.mBtm} style={{ marginRight: "16px" }}>
              Register
            </Button>
            <Button className={classes.mBtm} variant="contained"
              onClick={x => setIsRegistering(false)} disabled={buttonsDisabled}>
              Or Login
            </Button>
          </>
          :
          <>
            <Button variant="contained" onClick={handleLogin} disabled={buttonsDisabled}
              className={classes.mBtm} style={{ marginRight: "16px" }}>
              Login
            </Button>
            <Button className={classes.mBtm} variant="contained"
              onClick={x => setIsRegistering(true)} disabled={buttonsDisabled}>
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
