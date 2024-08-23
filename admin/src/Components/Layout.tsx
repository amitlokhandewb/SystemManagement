import React from "react";
import "../Resources/Index.scss";
import { Box, Grid } from "@mui/material";
import BasicTabs from "./BasicTabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="adminlayout">
      <h2>Admin Dashboard</h2>
      <BasicTabs />
      <ToastContainer theme="colored" />
    </div>
  );
}

export default Layout;
