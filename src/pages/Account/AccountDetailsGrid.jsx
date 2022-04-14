import React, { useState } from "react";
import { Button, Grid, Card, CardContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import "../../styles/slant.css";
import { signOut } from 'firebase/auth';
import { useAuthValue } from "../../components/AuthContext";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  },
  wid100: {
    width: "100%"
  }
}));

const AccountDetailsGrid = () => {
  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const data = authContext.data;

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
          <Card>
            <CardContent>
              <h3>Welcome</h3>
              <h5>Account Information</h5>
              <p>Email or something</p>
              <p>Change your password or something</p>
              <h5>Add Wallet</h5>
              <p>
                You should connect to the site with Metamask or some other
                Web3 provider.
              </p>
              <Button onClick={x => { signOut(auth); window.location.reload(); }}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8} sm={12}>
          <Card>
            <CardContent>
              <h3>Assets</h3>
              <Button>Claim</Button>
              <p>Insert asset prefab here</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountDetailsGrid;
