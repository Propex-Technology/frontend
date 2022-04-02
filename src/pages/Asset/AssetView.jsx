import React, { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { backendURL } from "../../contracts";
import DetailsSection from "./DetailsSection";
import AssetImageCarousel from "./AssetImageCarousel";
import ImportantInfoCard from "./ImportantInfoCard";
import PurchaseAssetCard from "./PurchaseAssetCard";
import "../../styles/slant.css";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px!important",
  },
  wid100: {
    width: "100%"
  }
}));

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

  // Manage purchase state
  let [isPurchasing, setIsPurchasing] = useState(false);

  return (
    <section className={clsx("section")} id="asset-view">
      <div className="slantBackground" />
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3}>
            {asset == undefined || asset == 0 ? <></> :
              isPurchasing ?
                <PurchaseAssetCard {...asset} setIsPurchasing={setIsPurchasing} />
                :
                <>
                  <AssetImageCarousel {...asset} />
                  <ImportantInfoCard {...asset} setIsPurchasing={setIsPurchasing} />
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
