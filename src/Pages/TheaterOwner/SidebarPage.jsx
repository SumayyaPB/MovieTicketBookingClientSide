// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../../Components/TheaterOwner/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../Components/user/Header";

const SidebarPage = () => {
  return (
    <div className="row">
      <Header/>
      <Sidebar/>
      <Outlet />
    </div>
  );
};

export default SidebarPage;
