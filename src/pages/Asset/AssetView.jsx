import React, { useState } from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { backendURL } from "../../contracts";
import { currencySymbol } from "../../utils";
import DetailsSection from "./DetailsSection";
import AssetImageCarousel from "./AssetImageCarousel";
import SliderNoThumb from "../../components/SliderNoThumb";
import "./slant.css";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  },
  wid100: {
    width: "100%"
  }
}));

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
const ImportantInfoCard = props => {
  const classes = useStyles();
  const curSybl = currencySymbol(props.currency);
  const totalRaised = props.tokenPrice * 0;// TODO: numberOwned from blockchain
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
            max={props.totalTokens}
          />          
          <LeftRightText left={`${props.totalTokens} Total Tokens`} right={`${tokensLeft} Tokens Left`} />
          <div style={{ height: "16px" }} />
          <Button size="lg" variant="contained" className={classes.wid100}
            onClick={() => {
              if (initalTokenSaleFinished) {
                window.location.href = "../marketplace";
              } else {
                // token sale
              }
            }}
          >
            {initalTokenSaleFinished ? "Sold Out" : "Purchase"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

const AssetView = () => {
  const classes = useStyles();
  const { assetId } = useParams();

  // Fetch Data from Backend
  let [asset, setAsset] = useState(undefined);
  if (asset === undefined) {
    setAsset(0);
    fetch(`${backendURL}/assets/get/${assetId}`)
      .then(res => { return res.json(); })
      .then(res => {
        if (res.success) setAsset(res);
        else setAsset(-1);
      });
  }

  return (
    <section className={clsx("section")} id="asset-view">
      <div className="slantBackground" />
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3}>
            {asset == undefined || asset == 0 ? <></> :
              <>
                <AssetImageCarousel {...asset} />
                <ImportantInfoCard {...asset} />
                <DetailsSection {...asset} />
              </>
            }
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AssetView;
