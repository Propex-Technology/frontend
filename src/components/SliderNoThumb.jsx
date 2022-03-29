import { Slider } from "@mui/material";
import { withStyles } from '@mui/styles';

export default withStyles(theme => ({
  thumb: {
    display: "none !important"
  }
}))(Slider);
