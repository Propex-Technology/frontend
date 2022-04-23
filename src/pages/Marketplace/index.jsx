import React, { useEffect } from "react";
import TitleBlock from "./TitleBlock";
import MarketCards from "./MarketCards";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Marketplace = () => {
  return (
    <div className="landing">
      <Header />
      <TitleBlock />
      <MarketCards />
      <Footer1 />
    </div>
  );
};

export default Marketplace;
