import { Box, Grid } from "@mui/material";
import React from "react";

function GenericLayout({ componentList, state, setState }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {componentList.map((item, index) => (
            <div
              key={index}
              onClick={() => setState(index)}
              style={{
                backgroundColor: state === index ? "#3dcd58" : "#CACACA",
                color: state === index ? "white" : "black",
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
          {componentList[state]?.Component || (
            <div>You don't have permission to this tabs</div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenericLayout;
