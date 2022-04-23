import React, { useState } from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import "../../styles/slant.css";
import { signOut } from 'firebase/auth';
import { useAuthValue } from "../../components/AuthContext";
import { LoginCard } from "./LoginCard";
import Persona from 'persona';
import { personaTemplateId, backendURL } from '../../contracts';
import AccountDetailsGrid from "./AccountDetailsGrid";

let client = null;

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
    minHeight: "390px"
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
  const [receivingKYC, setReceivingKYC] = useState(false);

  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const data = authContext.data;
  console.log("AccountView data:", data);

  console.log(user);

  // Open persona client if necessary
  if (user != null && data != null && data.kycStatus == "incomplete" && client == null) {
    client = new Persona.Client({
      templateId: personaTemplateId,
      environment: "sandbox",
      referenceId: user.uid,
      onReady: () => client.open(),
      onComplete: ({ inquiryId, status, fields }) => {
        // Inquiry completed. Optionally tell your server about it.
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
        if (status === 'completed') {
          setReceivingKYC(true);

          // Fetch API request to update the KYC status of the user
          console.log("FETCHING verifyKYC FROM BACKEND");
          user.getIdToken()
            .then(token => fetch(`${backendURL}/users/get/verifyKYC`,
              {
                method: 'GET',
                headers: {
                  'Authorization': token
                },
              }))
            .then(res => res.json())
            .then(x => {
              // Then update user data accordingly.
              if (x.success) authContext.setData(x);
              else setReceivingKYC(false);
            })
            .catch(x => {
              console.error(x);
              setReceivingKYC(false);
            });
        }
      },
      onCancel: ({ inquiryId, sessionToken }) => console.log('onCancel'),
      onError: (error) => console.log(error),
    });
    console.log("PERSONA CLIENT", client);
  }

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
              data == null ?
                <></> :
                data.kycStatus === "incomplete" ?
                  <Card>
                    <CardContent>
                      <h3>{receivingKYC ? "Verifying your KYC..." : "You need to finish KYC!"}</h3>
                      <div>The government requires it to invest in real estate.</div>
                      <Button variant="contained" onClick={() => client.open()} disabled={receivingKYC}>
                        Begin KYC
                      </Button>
                      <Button variant="contained"
                        style={{ marginLeft: "12px" }}
                        onClick={x => { signOut(auth); window.location.reload(); }}
                      >
                        Sign Out
                      </Button>
                    </CardContent>
                  </Card> :
                  <AccountDetailsGrid />
            }
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default AccountView;
