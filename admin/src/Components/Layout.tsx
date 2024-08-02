import React from "react";
import "../Resources/Index.css";
import { Box, Grid } from "@mui/material";
import BasicTabs from "./BasicTabs";

function Layout() {
  return (
    <div className="adminlayout">
      <h2>Admin Dashboard</h2>
      <BasicTabs />
      {/* <Box sx={{ flexGrow: 1, paddingLeft: '100px', paddingRight: '100px' }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <div>xs=8</div>
          </Grid>
          <Grid xs={8}>
            <div>xs=4</div>
          </Grid>
        </Grid>
      </Box> */}
    </div>
  );
}

export default Layout;
