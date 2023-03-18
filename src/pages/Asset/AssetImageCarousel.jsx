import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";
import Carousel from 'react-material-ui-carousel';

function AssetImageCarousel(props) {

  const blurBackground = {
    backgroundSize: "cover",
    filter: "blur(16px)",
    width: "100%",
    height: "200%",
    position: "absolute",
    zIndex: "-1",

  };
  const indicatorWrapperProps = {
    style: { position: "absolute", bottom: "21px" }
  };

  // TODO: make the height change on mobile
  return (
    <Grid item md={7} sm={12} xs={12}>
      <Card>
        <CardMedia overflow="hidden">
          <Carousel 
            height="360px"
            autoPlay={false} 
            indicatorContainerProps={indicatorWrapperProps} 
          >
            {
              props.images.map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{ background: `url(${item})`, ...blurBackground }} />
                  <img src={item} className="imgcenter"
                    style={{ objectFit: "cover", maxHeight: "100%" }} 
                  />
                </React.Fragment>
              ))
            }
          </Carousel>
        </CardMedia>
      </Card>
    </Grid>
  );
}

export default AssetImageCarousel;