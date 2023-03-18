import React from "react";
import clsx from "clsx";
import { useStyles } from "../pages/Asset/AssetView";

export default function LeftRightText({ left, right }) {
  const classes = useStyles();
  return (
    <div className={clsx("flex", classes.wid100)}>
      <div className={classes.wid100}>
        {left}
      </div>
      <div className={clsx("text-right", classes.wid100)}>
        {right}
      </div>
    </div>);
}
