import { Typography } from '@mui/material'
import React from 'react'
import logo2 from "../Assets/logo 2.webp";



function RegisterLogo() {
  return (
    <div style={{ paddingLeft: "200px", paddingTop: "150px" }}>
      <div>
        <img src={logo2} style={{ maxHeight: "300px", maxWidth: "300px" }} />
      </div>
      <Typography variant="h4" color={"#3dcd58"} gutterBottom>
        Demo App
      </Typography>
      <Typography variant="h6" color={"#3dcd58"} gutterBottom>
        By Amit Lokhande
      </Typography>
    </div>
  )
}

export default RegisterLogo