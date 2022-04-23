import React, { useEffect } from "react";
import AccountView from "./AccountView";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Account = () => {

  return (
    <div className="landing">
      <Header />
      <AccountView />
      <Footer1 />
    </div>
  );
};

export default Account;
