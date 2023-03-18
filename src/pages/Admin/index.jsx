import React from "react";
import Header from "../../components/Header";
import AdminView from "./AdminView";
import NotFound from "../NotFound";
import { useAuthValue } from "../../components/AuthContext";

const Admin = () => {
  const auth = useAuthValue();
  console.log()

  return auth.user == null || auth.data == null || auth.data.isAdmin !== true ?
    <NotFound />
    :
    <div className="landing">
      <Header />
      <AdminView />
    </div>
  ;
};

export default Admin;
