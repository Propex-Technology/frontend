import React from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import clsx from "clsx";
import { currencySymbol } from "../../utils";
import SliderNoThumb from "../../components/SliderNoThumb";
import { useStyles } from "./AssetView";

const LeftRightText = ({ left, right }) => {
  const classes = useStyles();
  return (
    <div className={clsx("flex", classes.wid100)}>
      <div className={classes.wid100}>
        {left}
      </div>
      <div className={clsx("text-right", classes.wid100)}>
        {right}
      </div>
    </div>);
}

// TODO: Get sold tokens, your tokens from blockchain
export default props => {
  const classes = useStyles();
  const curSybl = currencySymbol(props.currency);
  const totalRaised = props.tokenPrice * 0; // TODO: numberOwned from blockchain
  const tokensOwned = 0; // TODO: tokens you own from blockchain
  const tokensSold = 0; // TODO: tokens sold in total from blockchain
  const tokensLeft = props.totalTokens - tokensSold;
  const initalTokenSaleFinished = tokensSold >= props.totalTokens;

  return (
    <Grid item md={5} sm={12}>
      <Card>
        <CardContent>
          <h3>{props.location.addressLine1}</h3>
          <div>{props.location.city}, {props.location.province} {props.location.zip}</div>
          <div className={clsx("flex", classes.wid100)}>
            <div className={classes.wid100}>
              {props.cashPayout}% CoC
            </div>
            <div className={clsx("text-right", classes.wid100)}>
              {props.estimatedROI}% ROI
            </div>
          </div>
          <LeftRightText left="Total On-Chain Raise:" right={curSybl + totalRaised} />
          <LeftRightText left="Off-Chain Raised:" right={curSybl + props.offPlatformRaise} />
          <LeftRightText left="Tokens Owned:" right={tokensOwned} />
          <div style={{ height: "60px" }} />
          <SliderNoThumb
            style={{ width: "100%" }}
            value={tokensSold}
            max={props.totalTokens} />
          <LeftRightText left={`${props.totalTokens} Total Tokens`} right={`${tokensLeft} Tokens Left`} />
          <div style={{ height: "16px" }} />
          <Button size="lg" variant="contained" className={classes.wid100}
            onClick={() => {
              if (initalTokenSaleFinished) {
                window.location.href = "../marketplace";
              } else {
                // token sale
                props.setIsPurchasing(true);
              }
            }}
          >
            {initalTokenSaleFinished ? "Sold Out" : "Purchase"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
