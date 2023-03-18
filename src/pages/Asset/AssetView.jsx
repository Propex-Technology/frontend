import React, { useState, useEffect } from "react";
import { Grid, Skeleton } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { backendURL } from "../../contracts";
import DetailsSection from "./DetailsSection";
import AssetImageCarousel from "./AssetImageCarousel";
import ImportantInfoCard from "./ImportantInfoCard";
import PurchaseAssetCard from "./PurchaseAssetCard";
import "../../styles/slant.css";
import { scrollTo } from "../../utils";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "3rem 0px 0px 0px !important"//3rem 3rem 3rem 0px !important",
  },
  wid100: {
    width: "100%"
  },
  skeletonCard: {
    borderRadius: '8px',
    width: '100%',
    height: '360px !important'
  },
  littleCard: {
    padding: '12px',
    margin: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
    backgroundColor: '#3347ff !important',
  },
  bottomRight: {
    position: 'relative',
    bottom: '-14px',
    right: '-8px'
  },
  littleCardText: {
    position: 'relative',
    left: '5px',
    fontSize: '20px',
    color: 'white'
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
  useEffect(x => {
    scrollTo('root');
    /*
    // cowboy code 101: how to write an awful frontend
    setTimeout(function () {
      console.log("yep that's doing it")
    }, 1000);*/
  }, [isPurchasing]);

  return (
    <section className={clsx("section")} id="asset-view">
      <div className="slantBackground" />
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3}>
            {asset == undefined || asset == 0 ?
              <>
                <Grid item md={7} sm={12} xs={12}>
                  <Skeleton variant='rectangle' className={classes.skeletonCard} />
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                  <Skeleton variant='rectangle' className={classes.skeletonCard} />

                </Grid>
                <Grid item md={9} sm={11} xs={12}>
                  <Skeleton variant='rectangle' className={classes.skeletonCard} />
                </Grid>
              </>
              :
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
