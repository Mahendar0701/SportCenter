// import * as React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import Dashboard from "../../pages/dashboard";
// import { DefaultSidebar } from "./Sidebar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      {/* <DefaultSidebar /> */}
      <main>
        <div className=" ml-5 py-4 sm:px-6 lg:px-1 ">
          {/* <div className="mx-16  py-6 sm:px-6 lg:px-1"> */}
          <Dashboard />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
