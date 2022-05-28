import React, { useState } from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import "../../styles/slant.css";
import { useAuthValue } from "../../components/AuthContext";
import Persona from 'persona';
import { personaTemplateId, backendURL } from '../../contracts';


const AccountView = props => {
  // If they are, show the account page
  // If they aren't, show the login page

  return (
    <section className={clsx("section")} id="asset-view">
      <div className="slantBackground" />
      <Grid justify='center' marginTop='1rem'>
        <Grid item align='center'>
          <Card>
            <CardContent>
              ADMIN PAGE MY GUYS
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
};

export default AccountView;
