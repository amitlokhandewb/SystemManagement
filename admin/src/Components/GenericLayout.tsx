import { Box, Grid } from "@mui/material";
import React from "react";

function GenericLayout({ componentList, state, setState }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid xs={2}>
          {componentList.map((item, key) => (
            <div
              key={key}
              onClick={() => setState(item.id)}
              style={{
                backgroundColor: state == item.id ? "#3dcd58" : "#CACACA",
                color: state == item.id ? "white" : "black",
                paddingTop: "15px",
                paddingBottom: "15px",
                margin: 5,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              {item.label}
            </div>
          ))}
        </Grid>
        <Grid xs={9}>
          <div>{componentList.find((Item) => Item.id === state).Component}</div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenericLayout;
