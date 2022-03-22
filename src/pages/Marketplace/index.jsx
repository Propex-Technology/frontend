import React, { useEffect } from "react";
import { scrollTo } from "../../utils";
import TitleBlock from "./TitleBlock";
import MarketCards from "./MarketCards";
import Footer1 from "../../home/sections/Footer1";
import Header from "./Header";

const Marketplace = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

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
