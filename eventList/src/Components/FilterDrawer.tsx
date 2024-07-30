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
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import { EventType, priorityOptions } from "../Utilities/Data";


function FilterDrawer({
  handleChange,
  handleInputChange,
  updateDeviceType,
  handleApplyFilters,
  handleReset,
  handleclose,
  isfilterOPen,
  filter,
  evenTypes,
  priorities
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
            <option value={0}>All</option>
            {priorities.map((option, key) => (
              <option key={key} value={option.priorityId}>
                {option.priorityName}
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
            <Radio value={0}>All</Radio>
            {evenTypes?.map((item) => (
              <Radio key={item.eventTypeId} value={item.eventTypeId}>
                {item.eventTypeName}
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
