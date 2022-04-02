import React, { useEffect } from "react";
import { scrollTo } from "../../utils";
import AccountView from "./AccountView";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Account = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="landing">
      <Header />
      <AccountView />
      <Footer1 />
    </div>
  );
};

export default Account;
