import React, { useEffect } from "react";
import { scrollTo } from "../../utils";
import TitleBlock from "./TitleBlock";
import Portfolio2 from "../../home/sections/Portfolio2";
import Testimonial2 from "../../home/sections/Testimonial2";
import Services2 from "../../home/sections/Services2";
import CallToAction1 from "../../home/sections/CallToAction1";
import Pricing1 from "../../home/sections/Pricing1";
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
      
      <Footer1 />
    </div>
  );
};

export default Marketplace;
