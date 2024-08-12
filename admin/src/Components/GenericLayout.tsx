import { Box, Grid } from "@mui/material";
import React from "react";

function GenericLayout({ componentList, state, setState }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {componentList.map((item) => (
            <div
              key={item.id}
              onClick={() => setState(item.id)}
              style={{
                backgroundColor: state === item.id ? "#3dcd58" : "#CACACA",
                color: state === item.id ? "white" : "black",
                paddingTop: "15px",
                paddingBottom: "15px",
                margin: 5,
                borderRadius: 5,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {item.label}
            </div>
          ))}
        </Grid>
        <Grid item xs={10}>
          {componentList.find((item) => item.id === state)?.Component || (
            <div>Component not found</div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenericLayout;
