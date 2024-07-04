import React from "react";
import {
  Drawer,
  Button,
  Placeholder,
  DateRangePicker,
  InputNumber,
  InputPicker,
  Radio,
  RadioGroup,
} from "rsuite";
import { FilterUtility } from "../Utilities/FilterUtility";
import { EventType } from "./Util";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";

const priorityOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];
function FilterDrawer({
  handleChange,
  handleInputChange,
  updateDeviceType,
  handleApplyFilters,
  handleReset,
  handleclose,
  isfilterOPen,
  filter,
}) {
  return (
    <Drawer
      size={"xs"}
      backdrop={"static"}
      open={isfilterOPen}
      onClose={handleclose}
    >
      <Drawer.Header>
        <Drawer.Title>Filter </Drawer.Title>
      </Drawer.Header>
      {/* <Drawer.Body> */}
      <div style={{ margin: 5}}>
        <div className="select-container row">
          <label>Priority </label>
          <select
            style={{ width: "100%" }}
            onChange={(e) => handleChange(parseInt(e.target.value), "priority")}
            value={filter.priority}
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <label>Date range </label>
          <DateRangePicker
            format="MM/dd/yyyy hh:mm aa"
            showMeridian
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "daterange")}
            value={filter.daterange}
            placement="left"
          />
        </div>
        <div className="row">
          <label>Event Id </label>
          <InputNumber
            placeholder="Select some id"
            onChange={handleInputChange}
            value={filter.eventId}
            min={0}
            max={999}
            maxLength={3}
          />
        </div>
        <div className="row">
          <label>Event Type </label>
          <RadioGroup
            name="radio-group-inline"
            style={{ width: "auto" }}
            onChange={(e) => handleChange(e, "eventType")}
            value={filter.eventType}
          >
            <Radio value={""}>All</Radio>
            {EventType.map((item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ))}
          </RadioGroup>
        </div>
        <div className="row">
          <label>Device Type </label>
          <InputPicker
            data={updateDeviceType}
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "deviceType")}
            defaultValue={0}
            value={filter.deviceType}
            placement="left"
          />
        </div>
      </div>
      {/* </Drawer.Body> */}
      <Drawer.Actions>
        <div className="row">
          <Button appearance="primary" color="violet" onClick={handleReset}>
            Reset
          </Button>
          <Button
            appearance="primary"
            color="cyan"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </Drawer.Actions>
    </Drawer>
  );
}

export default FilterDrawer;
