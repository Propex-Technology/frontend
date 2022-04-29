import React, { useState } from "react";
import {
  Grid, Card, CardHeader, CardContent, Button,
  IconButton, RadioGroup, Radio, FormControlLabel
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import Scrollbar from "react-perfect-scrollbar";
import ReactMarkdown from "react-markdown";
import { useFetchMarkdown } from '../../utils';
import clsx from "clsx";
import { useAuthValue } from "../../components/AuthContext";
import { LoginCard } from "../Account/LoginCard";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  purchaseCard: {
    minHeight: "400px"
  },
  tosScroll: {
    maxHeight: "450px",
    paddingRight: "2rem"
  }
}));


export default props => {
  // Authentication status
  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const notAuth = user === null;
  const data = authContext.data;
  if (data !== null && data.kycStatus === "incomplete") {
    window.location.replace("./account");
  }

  // Purchase Phase
  const [purchasePhase, setPurchasePhase] = useState(0);

  // Terms of Service
  const tos = useFetchMarkdown(props.tos);

  function PurchasePhaseCard(phase) {
    switch (phase) {
      case 0:
        return <TosCard {...props} tos={tos} setPurchasePhase={setPurchasePhase} />
      case 1:
        return <TransactionCard {...props} setPurchasePhase={setPurchasePhase} />
      default:
        return <></>
    }
  }


  return (
    <Grid item xs={12} container={notAuth} justify={notAuth ? 'center' : 'inherit'}>
      {notAuth ?
        <Grid item align='center' xs={12}>
          <LoginCard auth={auth} />
        </Grid>
        : data === null ? <></> : PurchasePhaseCard(purchasePhase)
      }
    </Grid>
  )
}

const TosCard = props => {
  const classes = useStyles();
  const tos = props.tos;
  const setPurchasePhase = props.setPurchasePhase;

  return <Card className={classes.purchaseCard}>
    <CardHeader
      action={<IconButton aria-label="go-back" onClick={() => props.setIsPurchasing(false)}>
        <ArrowBackIcon />
      </IconButton>}
      title={"Purchase Fractionalized NFT for " + props.location.addressLine1}
      subheader="Terms of Service" />
    <CardContent>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <Scrollbar
            className={clsx(classes.tosScroll, "scrollable-content")}
            option={{ suppressScrollX: true }}
          >
            <ReactMarkdown>
              {tos}
            </ReactMarkdown>
          </Scrollbar>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Please read the terms of service in its entirety before making your purchase.</p>
          {/* TODO: make it so that this can only be clicked if you scrolled to the bottom */}
          <Button onClick={() => setPurchasePhase(1)}>
            Accept Terms of Service
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}

const TransactionCard = props => {
  const classes = useStyles();
  const tos = props.tos;
  const setPurchasePhase = props.setPurchasePhase;

  const [currency, setCurrency] = useState("USDC");
  const [amount, setAmount] = useState(1);

  return <Card className={classes.purchaseCard}>
    <CardHeader
      action={<IconButton aria-label="go-back" onClick={() => props.setIsPurchasing(false)}>
        <ArrowBackIcon />
      </IconButton>}
      title={"Purchase Fractionalized NFT for " + props.location.addressLine1}
      subheader="Transaction" />
    <CardContent>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <p>insert cool image here</p>
        </Grid>
        <Grid item sm={6} xs={12}>
          <p>Make your purchase using:</p>
          <span>
            <RadioGroup defaultValue="USDC" onChange={x => setCurrency(x.target.value)}>
              <FormControlLabel value="USDC" control={<Radio />} label="USDC" />
              <FormControlLabel value="USDT" control={<Radio />} label="USDT" />
              <FormControlLabel value="DAI" control={<Radio />} label="DAI" />
            </RadioGroup>
            <div>
              <p>Total Order</p>
              <p>$300</p>
            </div>
          </span>
          <Button onClick={() => setPurchasePhase(1)} variant='contained'>
            Purchase {amount} Fractionalized NFT{amount > 1 ? 's' : ''} with {currency}
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}
