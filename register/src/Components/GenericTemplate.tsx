import React, { Children } from 'react'
import { Box, Grid } from "@mui/material";
import RegisterLogo from './RegisterLogo';

function GenericTemplate({Children}) {
  return (
    <div style={{ padding: 5, height: "97vh" }}>
      <div style={{ backgroundColor: "white", height: "20vh" }}>
      </div>
      <div style={{ backgroundColor: "#9AE2A7", height: "7vh" }}></div>
      <div style={{ backgroundColor: "#3DCD58", height: "7vh" }}></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
           <RegisterLogo />
          </Grid>
          <Grid item xs={6}>
            {Children}
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default GenericTemplate