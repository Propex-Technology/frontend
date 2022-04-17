import React, { useState } from "react";
import { Button, Grid, Card, CardContent, Divider, IconButton, Box }
  from "@mui/material";
import { makeStyles } from '@mui/styles';
import "../../styles/slant.css";
import { signOut } from 'firebase/auth';
import { useAuthValue } from "../../components/AuthContext";
import LeftRightText from "../../components/LeftRightText";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  assetImage: {
    height: "80px",
    borderRadius: "8px"
  },
  textLeft: {
    textAlign: "left"
  },
  dFlex: {
    display: "flex"
  },
  textRight: {
    textAlign: "right"
  },
  vCenter: {
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const AccountDetailsGrid = () => {
  const classes = useStyles();

  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const data = authContext.data;

  // Fake data
  const assets = [0, 1, 2, 3, 4, 5];

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
          <Card>
            <CardContent>
              <h4>Your Account</h4>
              <div className={classes.textLeft}>
                <div style={{ height: "12px" }} />
                <h5>Account Information</h5>
                <LeftRightText left="Email:" right={user.email} />
                <LeftRightText
                  left={<div style={{ lineHeight: "40px" }}>Password:</div>}
                  right={
                    <IconButton size="xs">
                      <EditIcon />
                    </IconButton>
                  }
                />
                <div style={{ height: "12px" }} />
                <h5>Add Wallet</h5>
                <p>
                  You should connect to the site with Metamask or some other
                  Web3 provider.
                </p>
                <Button onClick={x => { signOut(auth); window.location.reload(); }}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item container md={8} sm={12} spacing={3}>
          <Grid item xs={12} alignItems="center">
            <Card>
              <CardContent>
                <h4>Asset Summary</h4>
                <Grid container className={classes.textLeft}>
                  <Grid item xs={4}>
                    <div>Account Value:</div>
                    <h5>$2000</h5>
                  </Grid>
                  <Grid item xs={4}>
                    <div>Properties:</div>
                    <h5>50</h5>
                  </Grid>
                  <Grid item xs={4}>
                    <div>Total Tokens:</div>
                    <h5>500</h5>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <h4>Assets</h4>
                <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
                <div className={classes.dFlex} style={{ justifyContent: "center" }}>
                  <div className={classes.textLeft} style={{ minWidth: "160px" }}>
                    <div>Rent to Claim (in USDC)</div>
                    <h2>$8.03</h2>
                  </div>
                  <div className={clsx(classes.textRight, classes.vCenter)} style={{ marginLeft: "48px" }}>
                    <Button variant="contained">Claim Rent</Button>
                  </div>
                </div>
                <Divider style={{ marginTop: "12px", marginBottom: "16px" }} />
                {assets.map((x, i) => <AssetDisplay />)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const AssetDisplay = props => {
  const classes = useStyles();

  const AssetDetail = ({ title, text }) => (
    <div style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}>
      <div>{title}</div>
      <div>{text}</div>
    </div>
  );

  return (
    <div className={classes.dFlex} style={{ textAlign: "left", marginBottom: "12px" }}>
      <img className={classes.assetImage}
        src="https://www.propertypriceadvice.co.uk/wp-content/uploads/2019/02/house-red-features-home-insurance.jpg"
      />
      <div style={{ marginLeft: "12px", width: "100%" }}>
        <h5>1234 Chicago Way</h5>
        <div className={classes.dFlex}>
          <AssetDetail title="Id" text={0} />
          <AssetDetail title="Tokens" text={12} />
          <AssetDetail title="Current Value" text="$1204" />
          <AssetDetail title="Total Rent Generated" text="$12.01" />
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsGrid;
