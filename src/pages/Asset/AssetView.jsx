import React from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  }
}));

const ImageCarousel = props => {
  return (
    <Grid item sm={8} xs={12}>
      <Card>
        <CardContent>
          IMAGE GOES HERE
        </CardContent>
      </Card>
    </Grid>
  );
}

const ImportantInfoCard = props => {
  return (
    <Grid item sm={4} xs={12}>
      <Card>
        <CardContent>
          IMPORTANT INFO GOES HERE
        </CardContent>
      </Card>
    </Grid>
  );
}

const DetailsSection = props => {
  return (
    <Grid item sm={10} xs={12}>
      <div>DETAILS GO HERE</div>
    </Grid>
  );
}

const AssetView = () => {
  const classes = useStyles();
  const { assetId } = useParams();

  // Make request

  return (
    <section className={clsx("section")} id="intro1">
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3}>
            <ImageCarousel />
            <ImportantInfoCard />
            <DetailsSection />
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AssetView;
