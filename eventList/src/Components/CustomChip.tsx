import React, { useEffect } from "react";
import { Button } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import { Tooltip } from "@mui/material";
import { priorityOptions } from "../Utilities/Data";
import CloseIcon from '@rsuite/icons/Close';


function CustomChip({ chip, handlesingleReset, filter }) {
  useEffect(() => {
    console.log("filterstate", filter);
  }, [filter]);

  const getPriorityLabel = (value) => {
    const option = priorityOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const fetchValue = (item) => {
    const filterValue = filter[item];
    const displayValue =
      item === "priority" ? getPriorityLabel(filterValue) : filterValue;
    return displayValue;
  };
  return (
    <div className="row">
      <label >{chip.length} Filters Applied</label>
      {chip.map((item) => (
        <Tooltip title={`${fetchValue(item)}`} sx={{ marginLeft: 5}}>
          <Button
            key={item}
            appearance="ghost"
            style={{ margin: 3, borderRadius: "5em / 5em" }}
          >
            {item}
            <CloseIcon
              id={item}
              onClick={handlesingleReset}
              style={{ marginLeft: "10px" }}
            />
          </Button>
        </Tooltip>
      ))}
      {/* <Stack direction="row" spacing={1}>
     <Chip label={item} variant="outlined"  onDelete={handlesingleReset}  />

       </Stack> */}
    </div>
  );
}

export default CustomChip;
