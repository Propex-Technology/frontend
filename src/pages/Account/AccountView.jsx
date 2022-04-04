import React, { useEffect } from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import "../../styles/slant.css";
import {
  signOut
}
  from 'firebase/auth';
import { useAuthValue } from  "../../components/AuthContext";
import { LoginCard } from "./LoginCard";

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
