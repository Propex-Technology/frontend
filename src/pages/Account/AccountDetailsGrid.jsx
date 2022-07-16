import React, { useState, useEffect } from "react";
import {
  Button, Grid, Card, CardContent, Divider, IconButton, TextField,
  Fade, Modal, Backdrop, Tab, Tabs, CardMedia, Link
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from '@mui/styles';
import EditIcon from "@mui/icons-material/Edit";
import { signOut } from 'firebase/auth';
import { useAuthValue } from "../../components/AuthContext";
import LeftRightText from "../../components/LeftRightText";
import CurrencyTextField from "../../components/CurrencyTextField";
import { updatePassword } from "firebase/auth";
import { backendURL } from '../../contracts';
import { useEthers } from '@usedapp/core';
import clsx from "clsx";
import "../../styles/slant.css";
import './hoverEffects.css';

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

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  p: 4
};

const PRESIGNUP_MODE = process.env.NODE_ENV !== "development";

function toHex(stringToConvert) {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

// The page
const AccountDetailsGrid = () => {
  const [open, setOpen] = useState(false);
  const [balanceData, setBalanceData] = useState(null);
  const { account } = useEthers();

  const classes = useStyles();

  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const data = authContext.data;

  function handleModalOpen() {
    setOpen(true);
  }

  useEffect(() => {
    if (user != null && account != null) {
      user.getIdToken().then(token =>
        fetch(`${backendURL}/users/balances/${account}`,
          {
            method: 'GET',
            headers: {
              'Authorization': token
            },
          }))
        .then(res => res.json())
        .then(res => setBalanceData(res));
    }
  }, [account, user]);

  // Fake data
  const assets = [0, 1, 2, 3, 4, 5];

  return (
    <div className="container">
      <ChangePasswordModal open={open} setOpen={setOpen} />
      <Grid container spacing={3}>
        <>
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
                  <Button onClick={x => { signOut(auth); window.location.reload(); }}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container md={8} sm={12} spacing={3}>
            {PRESIGNUP_MODE ?
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <h4>You've finished KYC!</h4>
                    <p>
                      Thank you so much for completing the pre-signup for propex.
                      We will reach out when the app fully launches.
                    </p>
                    <div style={{ fontSize: "96px" }}>
                      🎉
                    </div>
                    <p>
                      The future of real estate investments are here on propex.
                    </p>
                  </CardContent>
                </Card>
              </Grid>
              :
              account == null ?
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <h4>Connect with your Wallet</h4>
                      <p>
                        Please connect to the website with your wallet to view your assets.
                        Ownership of assets are tied to your wallet.
                      </p>
                      <div style={{ fontSize: "96px" }}>
                        🎉
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                :
                <CompleteAssetView balanceData={balanceData} setBalanceData={setBalanceData} auth={auth} user={user} />
            }
          </Grid>
        </>
      </Grid>
    </div>
  );
};

const CompleteAssetView = ({ balanceData, setBalanceData, auth, user }) => {
  const classes = useStyles();
  const { account } = useEthers();

  const [rentOpen, setRentOpen] = useState(false);
  const [sendingClaim, setSendingClaim] = useState(false);
  const [claimAmount, setClaimAmount] = useState(0);
  const [tabState, setTabState] = useState(0);

  function handleModalOpen() {
    setRentOpen(true);
  }

  let totalBalance = balanceData?.balance.GBP, totalTokens = 0;
  balanceData?.tokenData?.forEach(x => {
    totalBalance += x.balance * x.tokenPrice;
    totalTokens += x.balance;
  });

  const requestRent = () => {
    // 1. Set button to waiting...
    setSendingClaim(true);

    // 2. Ask for nonce
    user.getIdToken()
      .then(token =>
        fetch(`${backendURL}/payments/withdrawNonce`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: account,
            amount: claimAmount,
            currency: 'GBP',
            method: 'USDC'
          })
        }))
      // 3. Sign nonce
      .then(res => res.json())
      .then(res => {
        if (res.success && typeof (res.nonce) !== 'number') {
          setSendingClaim(false);
          throw new Error('Withdraw nonce failure!');
        }

        return window.ethereum.request({
          method: 'personal_sign',
          params: [
            `0x${toHex(res.nonce.toString())}`,
            account
          ]
        });
      })
      .then(async (sig) => ({ sig: sig, token: await user.getIdToken() }))
      // 4. Send second request
      .then(res => fetch(`${backendURL}/payments/finalizeWithdraw`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': res.token
        },
        body: JSON.stringify({
          address: account,
          signature: res.sig
        })
      }))
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setBalanceData({ ...balanceData, balance: { GBP: balanceData.balance.GBP - claimAmount } })
        //window.location.reload();
      })
      .catch(err => {
        alert('Claim failed. Please try again.');
        console.error(err);
      })
      .finally(() => {
        setRentOpen(false);
        setSendingClaim(false);
      });
  }

  return (
    <>
      {rentModal()}
      {accountSummary()}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <h4>Assets</h4>
            <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
            <div className={classes.dFlex} style={{ justifyContent: "center" }}>
              <div className={classes.textLeft} style={{ minWidth: "160px" }}>
                <div>Rent to Claim</div>
                <h2>£{balanceData?.balance.GBP}</h2>
              </div>
              <div className={clsx(classes.textRight, classes.vCenter)} style={{ marginLeft: "48px" }}>
                <Button variant="contained" onClick={handleModalOpen}>Claim Rent</Button>
              </div>
              <div className={clsx(classes.textRight, classes.vCenter)} style={{ marginLeft: "48px" }}>
                <Button variant="contained" onClick={handleModalOpen}>Reinvest</Button>
              </div>
            </div>
            <Divider style={{ marginTop: "12px", marginBottom: "16px" }} />
            <Tabs value={tabState} onChange={(e, v) => setTabState(v)} style={{ marginBottom: '1rem' }}>
              <Tab label='Cards' value={0} />
              <Tab label='List' value={1} />
            </Tabs>
            {tabState === 0 ?
              <Grid container spacing={3}>
                {balanceData?.tokenData?.map((x, i) => <AssetCardDisplay token={x} key={i} />)}
              </Grid> :
              balanceData?.tokenData?.map((x, i) => <AssetListDisplay token={x} key={i} />)
            }
            {
              balanceData?.tokenData?.length > 0 ?
                <Divider style={{ marginTop: "16px", marginBottom: "16px" }} /> :
                <></>
            }
            <p>
              The blockchain can occassionally be slow. If you made a purchase and are
              expecting your token, please wait 30 minutes before contacting us.
            </p>
          </CardContent>
        </Card>
      </Grid>
    </>
  );

  function accountSummary() {
    return <Grid item xs={12} alignItems="center">
      <Card>
        <CardContent>
          <h4>Asset Summary</h4>
          <Grid container className={classes.textLeft}>
            <Grid item xs={4}>
              <div>Account Value:</div>
              <h5>£{totalBalance}</h5>
            </Grid>
            <Grid item xs={4}>
              <div>Properties:</div>
              <h5>{balanceData?.tokenData?.length}</h5>
            </Grid>
            <Grid item xs={4}>
              <div>Total Tokens:</div>
              <h5>{totalTokens}</h5>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>;
  }

  function rentModal() {
    return <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={rentOpen}
      onClose={x => setRentOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={rentOpen}>
        <Card style={modalBoxStyle}>
          <CardContent>
            <h3>
              Claim Rent
            </h3>
            <p>Rent will be sent as USDC to your account (exchange rates apply). Minimum $1 GBP.</p>
            <CurrencyTextField currencySymbol='£'
              maximumValue={balanceData?.balance.GBP.toString()}
              decimalPlaces={2}
              onChange={x => { console.log(x.target.value); setClaimAmount(x.target.value) }}
            />
            <div style={{ marginTop: '1rem' }}>
              <LoadingButton variant="contained"
                onClick={requestRent} loading={sendingClaim}
                disabled={claimAmount < 1 || claimAmount > totalBalance}
              >
                Submit Claim
              </LoadingButton>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>;
  }

}

// The prefab that displays the information
const AssetListDisplay = ({ token }) => {
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
        src={token.images[0]}
      />
      <div style={{ marginLeft: "12px", width: "100%" }}>
        <h5>{token.location.addressLine1}</h5>
        <div className={classes.dFlex}>
          <AssetDetail title="Id" text={token.assetId} />
          <AssetDetail title="Tokens" text={token.balance} />
          <AssetDetail title="Current Total Value" text={'£' + token.tokenPrice * token.balance} />
        </div>
      </div>
    </div>
  );
};

// The prefab that displays the information
const AssetCardDisplay = ({ token }) => {

  const HEIGHT_NUM = 255;
  const MEDIA_HEIGHT = HEIGHT_NUM + 'px';

  return (
    <Grid item md={4} sm={4} xs={12} >
      <Card className={`scaleup su-${(Math.random() * 10000).toFixed(0) % 4}`}>
        <CardMedia
          component="img"
          height={MEDIA_HEIGHT}
          image={token.images[0]}
          alt={token.location.addressLine1}
          className='blurOnHover'
        />
        <div style={{ position: 'relative', height: '0px', top: '-' + MEDIA_HEIGHT }} className='mediaSibling'>
          <div style={{ marginTop: 'auto' }}>
            <Link href={"/asset/" + token.assetId}>
              <Button style={{ marginTop: '4px', marginRight: '6px', color: 'white' }}>Sell</Button>
            </Link>
            <Link href={"/asset/" + token.assetId}>
              <Button style={{ marginTop: '4px', color: 'white' }}>View</Button>
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', height: '0px', top: '-28px' }}>
          <div style={{ backgroundColor: '#ffffff88', paddingTop: '4px', paddingBottom: '4px' }}>
            {token.balance} Tokens / {'£' + token.tokenPrice * token.balance}
          </div>
        </div>
      </Card>
    </Grid>
    /*
    <div className={classes.dFlex} style={{ textAlign: "left", marginBottom: "12px" }}>
      <img className={classes.assetImage}
        src={token.images[0]}
      />
      <div style={{ marginLeft: "12px", width: "100%" }}>
        <h5>{token.location.addressLine1}</h5>
        <div className={classes.dFlex}>
          <AssetDetail title="Id" text={token.assetId} />
          <AssetDetail title="slkflaksjdf" text={token.balance} />
          <AssetDetail title="Current Total Value" text={'£' + token.tokenPrice * token.balance} />
        </div>
      </div>
    </div>
    */
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
