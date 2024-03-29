import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardHeader, CardContent, Button,
  IconButton, RadioGroup, Radio, FormControlLabel,
  Skeleton, TextField, Link, Fab, Icon, Divider
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import Scrollbar from "react-perfect-scrollbar";
import ReactMarkdown from "react-markdown";
import { useFetchMarkdown } from '../../utils';
import clsx from "clsx";
import { useAuthValue } from "../../components/AuthContext";
import { LoginCard } from "../Account/LoginCard";
import { useContractFunction, useEthers } from "@usedapp/core";
import * as ethers from "ethers";
import abi from 'erc-20-abi';
import { LoadingButton } from '@mui/lab';
import { useParams } from "react-router-dom";
import { backendURL, blockScanner } from "../../contracts";
import LeftRightText from "../../components/LeftRightText";
import CopyButton from "../../components/CopyButton";

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
  const [transaction, setTransaction] = useState(null);

  // Terms of Service
  const tos = useFetchMarkdown(props.tos);

  function PurchasePhaseCard(phase) {
    switch (phase) {
      case 0:
        return <TosCard {...props} tos={tos} setPurchasePhase={setPurchasePhase} />
      case 1:
        return <TransactionCard {...props} setPurchasePhase={setPurchasePhase} setTransaction={setTransaction} />
      case 2:
        return <FinishedCard {...props} transaction={transaction} />
      default:
        return <></>
    }
  }


  return (
    <Grid item xs={12} container={notAuth} justify={notAuth ? 'center' : 'inherit'} height='100%' alignItems='center' >
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

  console.log("TOS", tos);

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
            {tos == null || tos === "" ?
              <>
                <Skeleton variant='rectangle' height='40px'
                  style={{ borderRadius: '8px', width: '70%', marginBottom: '16px' }}
                />
                <Skeleton variant='rectangle' height='30px'
                  style={{ borderRadius: '8px', width: '85%', marginBottom: '16px' }}
                />
                <Skeleton variant='rectangle' height='500px'
                  style={{ borderRadius: '8px', width: '90%', marginBottom: '16px' }}
                />
                <Skeleton variant='rectangle' height='500px'
                  style={{ borderRadius: '8px', width: '90%', marginBottom: '16px' }}
                />
              </> :
              <ReactMarkdown>
                {tos}
              </ReactMarkdown>
            }
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
  const setPurchasePhase = props.setPurchasePhase;
  const { assetId } = useParams();

  const [currency, setCurrency] = useState("USDC");
  const [amount, setAmount] = useState(1);
  const { account } = useEthers();

  // Testnet USDC
  const contract = new ethers.Contract("0x30d16d3e26e191fc831d66128653183034c1299f", abi);
  const { state, send, resetState } = useContractFunction(contract, 'transfer');
  const makePurchase = () => {
    console.log("AMOUNT:" + 119000000 * amount);
    send("0xd9AB652C616E11C7e13a479e5F3137400baA5E9c", 119000000 * amount);
  }
  useEffect(() => {
    console.log(state);
    if (state.status === 'Exception') resetState();
    else if (state.status === 'Success') {
      console.log("STARTING FINALIZE PURCHASE");
      fetch(`${backendURL}/assets/finalizePurchase`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assetId,
          address: account,
          amount: amount
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          props.setTransaction(res.transaction);
          setPurchasePhase(2);
        });
    }
  }, [state]);

  // Send USDC to 0xd9AB652C616E11C7e13a479e5F3137400baA5E9c

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
          <img src={props.images[0]} style={{ width: '100%', borderRadius: '16px' }} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <p>Make your purchase using:</p>
          <span>
            <RadioGroup defaultValue="USDC" onChange={x => setCurrency(x.target.value)}>
              <FormControlLabel value="USDC" control={<Radio />} label="USDC (exchange rates apply)" />
              <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
            </RadioGroup>
            <TextField
              name='amount' type='number' label='Amount' style={{ marginTop: '12px' }}
              onChange={v => setAmount(v.target.valueAsNumber)}
            />
            <div>
              <p>Total Order</p>
              <p>£{100 * amount}</p>
            </div>
          </span>
          <LoadingButton onClick={makePurchase} variant='contained' loading={state.status !== "None"}>
            Purchase {amount} Fractionalized NFT{amount > 1 ? 's' : ''} with {currency}
          </LoadingButton>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}

const FinishedCard = props => {
  const classes = useStyles();

  // middle ellipsis - http://stackoverflow.com/questions/831552/ellipsis-in-the-middle-of-a-text-mac-style
  function start_and_end(str) {
    if (str.length > 25) {
      return str.substr(0, 12) + '...' + str.substr(str.length - 12, str.length);
    }
    return str;
  }

  // https://www.youtube.com/watch?v=aYRxcxMpVNU
  async function addTokenToMetamask() {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: props.contractAddress,
            symbol: 'PPX-' + props.assetId,
            decimals: 0,
            image: 'https://cdn.discordapp.com/attachments/757328909686669362/999539148262215790/favicon.png',
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Coin has not been added');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <Card className={classes.purchaseCard}>
    <CardHeader
      title={"You Are Now a Proud Owner of " + props.location.addressLine1}
    //subheader="Your Assets Will Appear in the Next Minute"
    />
    <CardContent>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <h4 style={{ textAlign: 'center' }}>Your Assets Will Appear in the Next Minute</h4>
          <p>
            Congratulations on making an investment! Your assets will appear within your account
            in the next few minutes as the blockchain updates.
          </p>
          <div style={{ margin: 'auto', width: 'fit-content' }}>
            <Link href="/account">
              <Fab
                variant="extended"
                size="large"
                color="primary"
                aria-label="Buy"
                className="px-6 text-18 m-2"
                style={{ zIndex: 1 }}
              >
                <Icon className="mr-4">person</Icon>
                View Your Assets
              </Fab>
            </Link>
          </div>
          <Divider style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }} />
          <div style={{ marginBottom: '2rem' }}>
            <LeftRightText
              left={<flex>Token Address: <CopyButton copyText={props.contractAddress} /></flex>}
              right={<flex>{start_and_end(props.contractAddress)}</flex>}
            />
            <LeftRightText
              left={<flex>Distribution Transaction: <CopyButton copyText={props.transaction.hash} /></flex>}
              right={<flex>{start_and_end(props.transaction.hash)}</flex>}
            />
          </div>
          <div style={{ margin: 'auto', width: 'fit-content' }}>
            <Link href={blockScanner + '/tx/' + props.transaction.hash} target='_blank'>
              <Button style={{ marginRight: '6px' }}>View on Block Explorer</Button>
            </Link>
            <Button style={{ marginLeft: '6px' }} onClick={addTokenToMetamask}>
              Add Token to Metamask
            </Button>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src={props.images[0]} style={{ width: '100%', borderRadius: '16px' }} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
}