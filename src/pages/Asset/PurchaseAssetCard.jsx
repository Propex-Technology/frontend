import React from "react";
import {
  Grid, Card, CardHeader, CardContent, Button,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  purchaseCard: {
    minHeight: "400px"
  }
}));


export default props => {

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.purchaseCard}>
        <CardHeader
          action={
            <IconButton aria-label="go-back" onClick={() => props.setIsPurchasing(false)}>
              <ArrowBackIcon />
            </IconButton>
          }
          title={"Purchase Fractionalized NFT for " + props.location.addressLine1}
          subheader="Terms of Service"
        />
        <CardContent>

          Terms of service go here
        </CardContent>
      </Card>
    </Grid>
  )
}

