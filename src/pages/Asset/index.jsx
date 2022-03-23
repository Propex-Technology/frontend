import React, { useEffect } from "react";
import { scrollTo } from "../../utils";
import TitleBlock from "../Marketplace/TitleBlock";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Asset = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="landing">
      <Header />
      <TitleBlock />
      <Footer1 />
    </div>
  );
};

export default Asset;
