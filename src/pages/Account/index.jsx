import React, { useEffect } from "react";
import AccountView from "./AccountView";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Account = () => {

  return (
    <div className="landing">
      <Header />
      <AccountView />
      <Footer />
    </div>
  );
};

export default Account;
