import React from "react";
import { Grid, Icon, Fab } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import Link from '@mui/material/Link';
import {useAuthValue} from "../../components/AuthContext";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  introWrapper: {
    padding: "5rem 0px 3rem !important",
    overflow: "visible !important",
    background: "url(./assets/images/marketplace-house.jpeg) center center/cover no-repeat",

    [theme.breakpoints.down("sm")]: {
      padding: "100px 0 !important",
      textAlign: "center",
      "& .list": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
  title: {
    textShadow: "0 4px 4px rgba(0, 0, 0, 0.22)",
  },
}));

const TitleBlock = () => {
  const classes = useStyles();
  const authContext = useAuthValue();
  console.log(authContext);

  return (
    <section className={clsx("section text-white")} id="intro1">
      <div className={classes.introWrapper}>
        <div className="container">
          <Grid container spacing={3} justify="center">
            <Grid item md={8}>
              <h1 className={clsx("mb-6 text-48", classes.title)}>
                Propex Marketplace
              </h1>
              <div className="text-22 mb-10">
                Invest in fractionalized real estate from £100.
              </div>

              <div>
                <Link href="account">
                  <Fab
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Buy"
                    className="px-6 text-18 m-2"
                    style={{ zIndex: 1 }}
                  >
                    <Icon className="mr-4">person</Icon>
                    {
                      authContext?.data?.kycStatus === 'completed' ?
                        "View Your Assets" : "Complete Registration"
                    }
                  </Fab>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default TitleBlock;
