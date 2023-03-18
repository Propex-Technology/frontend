import React, { useState } from "react";
import {
  Grid, Card, CardContent, TextField,
  Radio, Button, RadioGroup, FormControlLabel
} from "@mui/material";
import clsx from "clsx";
import "../../styles/slant.css";
import {useAuthValue} from '../../components/AuthContext';
import { backendURL } from "../../contracts";

const AccountView = props => {
  // If they are, show the account page
  // If they aren't, show the login page

  const [submitted, setSubmitted] = useState(false);
  const authContext = useAuthValue();
  const user = authContext.user;

  const issuePayment = e => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const data = {
        amount: e.target.elements.amount.value,
        assetId: e.target.elements.assetId.value,
        currency: e.target.elements.currency.value
      }
      console.log(data);

      user.getIdToken()
        .then(token => fetch(`${backendURL}/payments/issuePayment`,
          {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(data)
          }
        ))
        .then(res => res.json())
        .then(res => { return alert(res); });
    }
    catch {
      alert('Form submission failed. Refresh page to try again.');
    }
  }

  return (
    <section className={clsx("section")}>
      <div className="slantBackground" />
      <div className="container" style={{ marginTop: '48px' }}>
        <Grid container marginTop='1rem'>
          <Grid item sm={6} xs={12}>
            <Card>
              <CardContent>
                <h4>Issue Payment</h4>
                <form onSubmit={issuePayment}>
                  <FormControlLabel
                    control={<TextField name='assetId' type='number' />}
                    label="Asset Id (integer)" labelPlacement='start'
                  />
                  <FormControlLabel
                    control={<TextField name='amount' type='number' />}
                    label="Total Dividend" labelPlacement='start'
                  />
                  <RadioGroup
                    defaultValue="GBP"
                    name="currency"
                  >
                    <FormControlLabel value="GBP" control={<Radio />} label="GBP" />
                    <FormControlLabel value="USD" control={<Radio />} label="USD" />
                    <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
                  </RadioGroup>
                  <Button type='submit' disabled={submitted}>Submit</Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default AccountView;
