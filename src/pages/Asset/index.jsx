import React, { useEffect } from "react";
import AssetView from "./AssetView";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Asset = () => {
  return (
    <div className="landing">
      <Header />
      <AssetView />
      <Footer1 />
    </div>
  );
};

export default Asset;
