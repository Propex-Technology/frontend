import React from "react";
import { Grid, Card, CardContent, Button, Tooltip } from "@mui/material";
import QuestionIcon from "@mui/icons-material/QuestionMarkOutlined";
import clsx from "clsx";
import { currencySymbol } from "../../utils";
import SliderNoThumb from "../../components/SliderNoThumb";
import { useStyles } from "./AssetView";
import LeftRightText from "../../components/LeftRightText";

const QuestionTooltip = ({ title }) => (
  <Tooltip title={title}>
    <QuestionIcon fontSize={"15px"} color="primary" />
  </Tooltip>
);

export default props => {
  const classes = useStyles();
  const curSybl = currencySymbol(props.currency);
  const tokensSold = props.purchasedTokens;
  const totalRaised = props.tokenPrice * tokensSold;
  const tokensLeft = props.totalTokens - tokensSold;
  const tokensOwned = 0; // TODO: how many tokens you own
  const initialTokenSaleFinished = tokensSold >= props.totalTokens;

  return (
    <Grid item md={5} sm={12} xs={12}>
      <Card>
        <CardContent>
          <h3>{props.location.addressLine1}</h3>
          <div>{props.location.city}, {props.location.province} {props.location.zip}</div>
          <div className={clsx("flex", classes.wid100)}>
            <div className={classes.wid100}>
              {props.cashPayout}% CoC
              <QuestionTooltip title="Yearly cash you gain in relation to investment." />
            </div>
            <div className={clsx("text-right", classes.wid100)}>
              <Tooltip title="Estimated yearly housing price increase + CoC.">
                <QuestionIcon fontSize={"15px"} color="primary" />
              </Tooltip>
              {props.estimatedROI}% ROI
            </div>
          </div>
          <LeftRightText
            left={<div>On-Chain Raised: <QuestionTooltip title="Amount of money raised so far on Propex." /></div>}
            right={curSybl + totalRaised}
          />
          <LeftRightText
            left={<div>Off-Chain Raised:<QuestionTooltip title="Amount of money raised off Propex." /></div>}
            right={curSybl + props.offPlatformRaise}
          />
          <LeftRightText left="Tokens Owned:" right={tokensOwned} />
          <div style={{ height: "60px" }} />
          <SliderNoThumb
            style={{ width: "100%" }}
            value={props.purchasedTokens}
            max={props.totalTokens} />
          <LeftRightText left={`${props.totalTokens} Total Tokens`} right={`${tokensLeft} Tokens Left`} />
          <div style={{ height: "16px" }} />
          <Button size="lg" variant="contained" className={classes.wid100} disabled={initialTokenSaleFinished}
            onClick={() => {
              if (initialTokenSaleFinished) {
                window.location.href = "../marketplace";
              } else {
                // token sale
                props.setIsPurchasing(true);
              }
            }}
          >
            {initialTokenSaleFinished ? "Sold Out" : "Purchase"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
