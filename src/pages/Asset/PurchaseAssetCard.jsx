import React from "react";
import {
  Grid, Card, CardHeader, CardContent, Button,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import Scrollbar from "react-perfect-scrollbar";
import ReactMarkdown from "react-markdown";
import { useFetchMarkdown } from '../../utils';
import clsx from "clsx";
import { useAuthValue } from "../../components/AuthContext";
import { LoginCard } from "../Account/LoginCard";

export const useStyles = makeStyles(({ palette, ...theme }) => ({
  purchaseCard: {
    minHeight: "400px"
  },
  tosScroll: {
    maxHeight: "450px",
    paddingRight: "2rem"
  }
}));


export default props => {

  const classes = useStyles();
  const tos = useFetchMarkdown(props.tos);
  const authContext = useAuthValue();
  const auth = authContext.auth;
  const user = authContext.user;
  const notAuth = user === null;
  const data = authContext.data;
  if (data !== null && data.kycStatus === "incomplete") {
    window.location.replace("./account");
  }

  return (
    <Grid item xs={12} container={notAuth} justify={notAuth ? 'center' : 'inherit'}>
      {notAuth ?
        <Grid item align='center' xs={12}>
          <LoginCard auth={auth} />
        </Grid>
        : data === null ? <></> :
          <Card className={classes.purchaseCard}>
            <CardHeader
              action={
                <IconButton aria-label="go-back" onClick={() => props.setIsPurchasing(false)}>
                  <ArrowBackIcon />
                </IconButton>
              }
              title={"Purchase Fractionalized NFT for " + props.location.addressLine1}
              subheader="Terms of Service"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                  <Scrollbar
                    className={clsx(classes.tosScroll, "scrollable-content")}
                    option={{ suppressScrollX: true }}
                  >
                    <ReactMarkdown>
                      {tos}
                    </ReactMarkdown>
                  </Scrollbar>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <p>Please read the terms of service in its entirety before making your purchase.</p>
                  {/* TODO: make it so that this can only be clicked if you scrolled to the bottom */}
                  <Button>Accept Terms of Service</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      }
    </Grid>
  )
}

