import React, { useEffect } from "react";
import { scrollTo } from "../utils";
import Intro2 from "../home/sections/Intro2";
import Portfolio2 from "../home/sections/Portfolio2";
import Testimonial2 from "../home/sections/Testimonial2";
import Services2 from "../home/sections/Services2";
import CallToAction1 from "../home/sections/CallToAction1";
import Pricing1 from "../home/sections/Pricing1";
import Footer1 from "../home/sections/Footer1";
import TopBar2 from "../home/sections/TopBar2";

const Marketplace = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="landing">
      <TopBar2 />
      <Intro2 />
      <Portfolio2 />
      <Testimonial2 />
      <Services2 />
      <CallToAction1 bg="./assets/images/home-bg-black.png" />
      <Pricing1 />
      {/* <Contact1 /> */}
      <Footer1 />
    </div>
  );
};

export default Marketplace;
