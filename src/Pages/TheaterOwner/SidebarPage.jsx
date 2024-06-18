// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../Components/TheaterOwner/Sidebar";
import { Outlet } from "react-router-dom";

const SidebarPage = () => {
  return (
    <div className="row">
      <Header />
      <Outlet />
    </div>
  );
};

export default SidebarPage;
