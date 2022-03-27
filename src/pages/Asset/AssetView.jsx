import React, { useState } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { backendURL } from "../../contracts";
import { currencySymbol } from "../../utils";
import DetailsSection from "./DetailsSection";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  },
  wid100: {
    width: "100%"
  }
}));

const ImageCarousel = props => {
  return (
    <Grid item sm={7} xs={12}>
      <Card>
        <CardContent>
          IMAGE GOES HERE
        </CardContent>
      </Card>
    </Grid>
  );
}

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

// TODO: Get data from blockchain
const ImportantInfoCard = props => {
  const classes = useStyles();
  const curSybl = currencySymbol(props.currency); 
  const totalRaised = props.tokenPrice * 0;// TODO: numberOwned from blockchain
  const tokensOwned = 0; // TODO: tokensOwned from blockchain
  const tokensLeft = props.totalTokens - tokensOwned;

  return (
    <Grid item sm={5} xs={12}>
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
          <div style={{height: "60px"}} />
          <LeftRightText left={`${props.totalTokens} Total Tokens`} right={`${tokensLeft} Tokens Left`} />
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
        console.log(res);
        if (res.success) setAsset(res);
        else setAsset(-1);
      });
  }

  return (
    <section className={clsx("section")} id="asset-view">
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3}>
            {asset == undefined || asset == 0 ? <></> :
              <>
                <ImageCarousel />
                <ImportantInfoCard {...asset} />
                <DetailsSection />
              </>
            }
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AssetView;
