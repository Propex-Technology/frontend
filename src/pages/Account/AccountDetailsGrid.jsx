import React, { useState, useEffect } from "react";
import {
  Button, Grid, Card, CardContent, Divider, IconButton, TextField,
  Fade, Modal, Backdrop
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import "../../styles/slant.css";
import { signOut } from 'firebase/auth';
import { useAuthValue } from "../../components/AuthContext";
import LeftRightText from "../../components/LeftRightText";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";
import { updatePassword } from "firebase/auth";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
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

// The page
const AccountDetailsGrid = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const data = authContext.data;

  function handleModalOpen() {
    setOpen(true);
  }

  // Fake data
  const assets = [0, 1, 2, 3, 4, 5];

  return (
    <div className="container">
      <ChangePasswordModal open={open} setOpen={setOpen} />
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
                    <IconButton size="xs" onClick={handleModalOpen}>
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
                {assets.map((x, i) => <AssetDisplay key={i} />)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// The prefab that displays the information
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

const ChangePasswordModal = props => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sendingChange, setSendingChange] = useState(false);
  const auth = useAuthValue();

  useEffect(() => {
    if (newPassword.length < 8)
      setErrorMessage("Password length should be 8 characters or more.");
    else if (!PASSWORD_REGEX.test(newPassword))
      setErrorMessage("Password should contain a special character, a number, and a letter.");
    else if (newPassword != confirmNewPassword)
      setErrorMessage("Passwords don't match!");
    else setErrorMessage("");
  }, [newPassword, confirmNewPassword]);

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    p: 4
  };

  const handlePasswordChange = () => {
    setSendingChange(true);
    updatePassword(auth.user, newPassword)
      .then(x => {
        setErrorMessage('Password successfully changed.');
      })
      .catch(x => {
        setErrorMessage('An error occurred. Try logging out and logging back in.');
      })
      .finally(x => {
        setSendingChange(false);
      });
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={x => props.setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Card style={modalBoxStyle}>
          <CardContent>
            <h3>
              Change Password
            </h3>
            <div style={{ color: "red", margin: "8px", minHeight: "42px" }}>{errorMessage}</div>
            <div style={{ marginBottom: "12px" }}>
              <TextField id="newPassword" label="New Password" variant="outlined" type="password"
                onChange={x => setNewPassword(x.target.value)} value={newPassword} style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <TextField id="repeatNewPassword" label="Repeat Password" variant="outlined" type="password"
                onChange={x => setConfirmNewPassword(x.target.value)} value={confirmNewPassword}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Button variant="contained" disabled={errorMessage !== "" || !sendingChange}
                onClick={handlePasswordChange}>
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  )
}

export default AccountDetailsGrid;
