import React from "react";
import TitleBlock from "./TitleBlock";
import MarketCards from "./MarketCards";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Marketplace = () => {
  return (
    <div className="landing">
      <Header />
      <TitleBlock />
      <MarketCards />
      <Footer />
    </div>
  );
};

export default Marketplace;
