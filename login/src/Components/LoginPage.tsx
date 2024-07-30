import { Box, Grid } from "@mui/material";
import React from "react";
import GenericTemplate from "./GenericTemplate";
import LoginForm from "./LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  return <><GenericTemplate Children={<LoginForm />} /><ToastContainer theme="colored" />
  </>;
}

export default LoginPage;
