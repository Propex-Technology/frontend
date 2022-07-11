import React from "react";

import { Grid, Button, Icon } from "@mui/material";
import { makeStyles } from '@mui/styles';

import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footerSection: {
    "& h4:after": {
      content: '" "',
      position: "absolute",
      bottom: -8,
      left: 0,
      height: 2,
      width: 64,
      background: palette.secondary.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={clsx("bg-light-dark", classes.footerSection)} id="footer1">
      <div className="container">
        <Grid container>
          <Grid item lg={6} md={6} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">
                Propex
              </h4>
              <p className="text-inherit">
                Bringing fractional investment of real world assets to the blockchain.
              </p>
              <a href='mailto:info@propex.uk'>
                <Button variant="contained" color="secondary" >
                  Contact Us
                </Button>
              </a>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">Contact</h4>
              <div className="px-4 my-8 flex items-center mx--4">
                <Icon className="text-secondary">mail</Icon>
                <div className="pl-4">
                  <h5 className="m-0 p-0 text-16">Email</h5>
                  <p className="m-0 p-0 text-inherit">info@propex.uk</p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">Disclaimer</h4>
              <p className="text-inherit">
                Propex reserves the right to make additions, deletions, or modification to 
                the contents on the Service at any time without prior notice.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
