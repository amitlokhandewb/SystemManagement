import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Button,
  DateRangePicker,
  Dropdown,
  Input,
  InputPicker,
  Radio,
  RadioGroup,
} from "rsuite";
import { Chips } from "primereact/chips";
import { EventType, deviceType } from "./Util";

const priorityOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];
let DeviceType = deviceType.map((item) => ({
  value: item,
  label: item,
}));
let updateDeviceTYpe = [{ value: "", label: "All" }, ...DeviceType];

function FilterDialog({ isfilterOPen, setisfilterOPen, setFilterData, data }) {
  const [filter, setFilter] = useState({
    priority: 0,
    daterange: null,
    eventId: 0,
    deviceType: "",
    eventType: "",
  });
  const [value, setValue] = useState([]);

  const handleReset = () => {
    setFilter({
      priority: 0,
      daterange: null,
      eventId: 0,
      deviceType: "",
      eventType: "",
    });
  };
  const handleChange = (e, name) => {
    var exist = value.find((item) => item === name);
    if (!exist) {
      setValue([...value, name]);
    }
    setFilter({ ...filter, [name]: e });
  };
  console.log("filter", filter);
  return (
    <Modal
      isOpen={isfilterOPen}
      contentLabel="Filter Data"
      style={{
        overlay: {
          backgroundColor: "rgba(105, 104, 104, 0.75)",
        },
        content: {
          width: "20%",
          height: "70%",
          margin: "auto",
          borderRadius: "10px",
        },
      }}
    >
      <div>Filter Column</div>
      <div>
        <div>
          <Chips value={value} onChange={(e) => setValue(e.value)} />
        </div>
        <div>
          <label>{value.length} Filters Applied</label>
        </div>
        <div>
          <label>Priority </label>
          <InputPicker
            data={priorityOptions}
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "priority")}
            defaultValue={0}
            value={filter.priority}
          />
        </div>
        <div>
          <label>Date range </label>
          <DateRangePicker
            format="MM/dd/yyyy hh:mm aa"
            showMeridian
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "daterange")}
            value={filter.daterange}
          />
        </div>
        <div>
          <label>Event Id </label>
          <Input
            placeholder="Select some id"
            onChange={(e) => handleChange(e, "eventId")}
            value={filter.eventId}
          />
        </div>
        <div>
          <label>Event Tupe </label>
          <RadioGroup
            name="radio-group-inline"
            style={{ width: "auto" }}
            onChange={(e) => handleChange(e, "eventTYpe")}
            defaultValue={"all"}
          >
            <Radio value={"all"}>All</Radio>
            {EventType.map((item) => (
              <Radio value={item}>{item}</Radio>
            ))}
          </RadioGroup>
        </div>
        <div>
          <label>Device Type </label>
          <InputPicker
            data={updateDeviceTYpe}
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "deviceType")}
            defaultValue={0}
          />
        </div>
      </div>

      <div
        style={{
          gap: 5,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button appearance="primary" color="violet" onClick={handleReset}>
          Reset
        </Button>
        <Button
          appearance="primary"
          color="cyan"
          onClick={() => setisfilterOPen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default FilterDialog;
