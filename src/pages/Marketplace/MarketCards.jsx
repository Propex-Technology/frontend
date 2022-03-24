
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Slider,
} from "@mui/material";
import { withStyles, makeStyles } from '@mui/styles';
import { backendURL } from "../../contracts";
import clsx from "clsx";
import Link from '@mui/material/Link';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    "& .card-header": {
      background: "rgba(0, 0, 0, 0.024)",
    },
    "& .card-header-highlighted": {
      background: "rgba(var(--primary),1)",
      "& span": {
        color: "#fff",
      },
    },
  },
  wid100: {
    width: "100%"
  },
  pb0: {
    paddingBottom: "0px !important"
  }
}));

const SliderNoThumb = withStyles(theme => ({
  thumb: {
    display: "none !important"
  }
}))(Slider);

// TODO: remaining information
const AssetCard = props => {
  const classes = useStyles();

  const currencySymbol =
    props.currency == "GBP" ? "£" :
      props.currency == "USD" ? "$" :
        props.currency;

  const remainingTokens = props.totalTokens - props.purchasedTokens;
  const percentTokensLeft = 100 - (remainingTokens / props.totalTokens * 100).toFixed(0);

  return (
    <Grid item lg={4} md={6} sm={6} xs={12}>
      <Link href={`/asset/${props.assetId}`}>
        <Card className={clsx("card", classes.card)}>
          <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt={props.location.addressLine1}
          />
          <CardContent>
            <div className={clsx("flex", classes.wid100)}>
              <h5 className={classes.wid100}>{props.location.addressLine1}</h5>
              <h5 className={clsx("text-right", classes.wid100)}>
                {props.estimatedROI}% ROI
              </h5>
            </div>
            <div className={clsx("flex", classes.wid100)}>
              <div className={classes.wid100}>
                {props.location.city}, {props.location.province} {props.location.zip}
              </div>
              <div className={clsx("text-right", classes.wid100)}>
                {props.cashPayout}% CoC
              </div>
            </div>
            <div className="mb-3" />
            <SliderNoThumb
              className={clsx(classes.wid100, classes.pb0)}
              value={props.purchasedTokens}
              max={props.remainingTokens}
            />
            <div className={clsx("flex", classes.wid100)}>
              <div className={classes.wid100}>{currencySymbol}{props.raiseGoal} - {percentTokensLeft}% Funded</div>
              <div className={clsx("text-right", classes.wid100)}>
                {remainingTokens} Tokens Left
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

const MarketCards = () => {
  const classes = useStyles();

  // Fetch Data from Backend
  let [assetList, setAssetList] = useState(undefined);
  if (assetList === undefined) {
    setAssetList(0);
    fetch(`${backendURL}/assets/get/shortlist/30/0`)
      .then(res => { return res.json(); })
      .then(res => {
        if (res.success) setAssetList(res.data);
        else setAssetList(-1);
      });
  }

  return (
    <div className="section section-market-cards" id="market-cards">
      <div className="container">
        <Grid container spacing={2}>
          {
            assetList === undefined || assetList === 0 ?
              <Grid item xs={12}><h3>Hold on... we're getting the investments for you.</h3></Grid>
              : assetList === -1 || assetList.length == 0 ?
                <Grid item xs={12}><h3>Whoops! There was an error! Try refreshing?</h3></Grid>
                :
                assetList.map(asset => <AssetCard {...asset} key={asset.assetId} />)
          }
        </Grid>
      </div>
    </div>
  );
};

export default MarketCards;
export { AssetCard };
