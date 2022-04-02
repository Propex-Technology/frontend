import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, TextField, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import "../../styles/slant.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
  from 'firebase/auth';
import { useAuthValue } from  "../../components/AuthContext";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  },
  wid100: {
    width: "100%"
  },
  loginCard: {
    width: "30%",
    minWidth: "250px",
    height: "50%",
    minHeight: "350px"
  },
  textPrimary: {
    color: palette.primary.main,
    //textAlign: "left",
    marginBottom: "16px"
  },
  mBtm: {
    marginBottom: "16px"
  }

}));

const LoginCard = props => {
  const classes = useStyles();

  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [buttonsDisabled, setButtonsDisabled] = useState(false);

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
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setButtonsDisabled(false);
      });
  }

  return (
    <Card className={classes.loginCard}>
      <CardContent>
        <h2 className={classes.textPrimary}>Login</h2>
        <div className={classes.mBtm}>
          <TextField id="email" label="Email" variant="outlined" type="email"
            onChange={x => setEmail(x.target.value)} value={email}
          />
        </div>
        <div className={classes.mBtm}>
          <TextField id="password" label="Password" variant="outlined" type="password"
            onChange={x => setPassword(x.target.value)} value={password}
          />
        </div>
        <Button variant="contained" onClick={handleLogin} disabled={buttonsDisabled}
          className={classes.mBtm} style={{ marginRight: "16px" }} >
          Submit
        </Button>
        <Button className={classes.mBtm} variant="contained"
          onClick={handleRegister} disabled={buttonsDisabled}>
          Register
        </Button>
        <div style={{ marginTop: "16px" }}>
          Forgot password?
        </div>
      </CardContent>
    </Card>
  )
}

const AccountView = props => {
  const classes = useStyles();

  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;

  // If they are, show the account page
  // If they aren't, show the login page

  return (
    <section className={clsx("section")} id="asset-view">
      <div className="slantBackground" />
      <div className={classes.introWrapper}>
        <Grid justify='center' marginTop='1rem'>
          <Grid item align='center'>
            {user === null ?
              <LoginCard auth={auth} />
              :
              <Card>
                <CardContent>
                  You logged in. poggers
                  <Button onClick={x => signOut(auth)}>Sign Out</Button>
                </CardContent> {/*.then(x => forceUpdate()) */}
              </Card>
            }

          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default AccountView;
