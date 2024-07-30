import React from "react";
import RegisterForm from "./RegisterForm";
import GenericTemplate from "./GenericTemplate";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function RegisterPage() {
  return (
    <>
      <GenericTemplate Children={<RegisterForm />} />
      <ToastContainer theme="colored" />
    </>
  );
}

export default RegisterPage;
