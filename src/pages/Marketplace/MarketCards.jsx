
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

const MarketCards = () => {
  const classes = useStyles();

  // Fetch Data from Backend
  let [assetList, setAssetList] = useState(null);
  fetch(`${backendURL}/assets/get/shortlist/30/0`)
    .then(res => res.json())
    .then(res => {
      //if (res.success) setAssetList(res.data);
      //else setAssetList(-1);
    });

  return (
    <div className="section section-market-cards" id="market-cards">
      <div className="container">
        <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
                    <Card className={clsx("card", classes.card)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="/assets/images/marketplace-house.jpeg"
                        alt="property image"
                      />
                      <CardContent>
                        <div className={clsx("flex", classes.wid100)}>
                          <h5 className={classes.wid100}>dope</h5>
                          <h5 className={clsx("text-right", classes.wid100)}>
                            12% ROI
                          </h5>
                        </div>
                        <div className={clsx("flex", classes.wid100)}>
                          <div className={classes.wid100}>Chicago, IL 60244</div>
                          <div className={clsx("text-right", classes.wid100)}>
                            5.4% CoC
                          </div>
                        </div>
                        <div className="mb-3" />
                        <SliderNoThumb
                          className={clsx(classes.wid100, classes.pb0)}
                          value={100}
                          max={340}
                        />
                        <div className={clsx("flex", classes.wid100)}>
                          <div className={classes.wid100}>$184,750 - 66% Funded</div>
                          <div className={clsx("text-right", classes.wid100)}>
                            240 Tokens Left
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
          {
            assetList === null ?
              <Grid item xs={12}><h3>Hold on... we're getting the investments for you.</h3></Grid>
              : assetList === -1 || assetList.length == 0 ?
                <Grid item xs={12}><h3>Whoops! There was an error! Try refreshing?</h3></Grid>
                :
                assetList.forEach(asset => (
                  <Grid item lg={4} md={6} sm={6} xs={12}>
                    <Card className={clsx("card", classes.card)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="/assets/images/marketplace-house.jpeg"
                        alt="property image"
                      />
                      <CardContent>
                        <div className={clsx("flex", classes.wid100)}>
                          <h5 className={classes.wid100}>{asset.location.addressLine1}</h5>
                          <h5 className={clsx("text-right", classes.wid100)}>
                            12% ROI
                          </h5>
                        </div>
                        <div className={clsx("flex", classes.wid100)}>
                          <div className={classes.wid100}>Chicago, IL 60244</div>
                          <div className={clsx("text-right", classes.wid100)}>
                            5.4% CoC
                          </div>
                        </div>
                        <div className="mb-3" />
                        <SliderNoThumb
                          className={clsx(classes.wid100, classes.pb0)}
                          value={100}
                          max={340}
                        />
                        <div className={clsx("flex", classes.wid100)}>
                          <div className={classes.wid100}>$184,750 - 66% Funded</div>
                          <div className={clsx("text-right", classes.wid100)}>
                            240 Tokens Left
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
          }
        </Grid>
      </div>
    </div>
  );
};

export default MarketCards;
