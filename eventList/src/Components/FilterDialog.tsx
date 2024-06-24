import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Button,
  DateRangePicker,
  Input,
  InputNumber,
  InputPicker,
  Radio,
  RadioGroup,
} from "rsuite";
import { Chips } from "primereact/chips";
import { EventType, deviceType } from "./Util";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "primereact/dropdown";

const priorityOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];

function FilterDialog({
  isfilterOPen,
  setisfilterOPen,
  setFilterData,
  data,
  currentPageDeviceType,
}) {
  const [filter, setFilter] = useState({
    priority: 0,
    daterange: null,
    eventId: 0,
    deviceType: "",
    eventType: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState([]);

  let DeviceType = currentPageDeviceType.map((item) => ({
    value: item,
    label: item,
  }));
  let updateDeviceType = [{ value: "", label: "All" }, ...DeviceType];
  useEffect(() => {
    applyFilters();
  }, [filter]);

  useEffect(() => {
    setFilteredData(data);
  }, []);

  const handleReset = () => {
    setFilter({
      priority: 0,
      daterange: null,
      eventId: 0,
      deviceType: "",
      eventType: "", // Reset eventType to '' for All option
    });
    setValue([]);
    setFilteredData(data);
  };
  const getUniqueDeviceTypes = () => {
    // Step 1: Extract all device types from events
    const allDeviceTypes = filteredData.map((event) => event.deviceType);

    // Step 2: Filter out unique device types
    const uniqueDeviceTypes = allDeviceTypes.filter(
      (deviceType, index, array) => array.indexOf(deviceType) === index
    );

    return uniqueDeviceTypes;
  };
  // useEffect(() => {
  //   setcurrentPageDeviceType(getUniqueDeviceTypes());
  // },[filteredData])
  const handlesingleReset = (e) => {
    let id = e.target.id;
    if (id === "deviceType" || id === "eventType") {
      setFilter((prev) => ({ ...prev, [id]: "" }));
      setValue((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "priority") {
      setFilter((prev) => ({ ...prev, priority: 0 }));
      setValue((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "daterange") {
      setFilter((prev) => ({ ...prev, daterange: null }));
      setValue((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "eventId") {
      setFilter((prev) => ({ ...prev, eventId: 0 }));
      setValue((prevValue) => prevValue.filter((item) => item !== id));
    }
  };

  const handleChange = (e, name) => {
    var exist = value.find((item) => item === name);
    if (!exist) {
      setValue([...value, name]);
    }
    if (name === "eventType" && e === "") {
      setValue((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "priority" && e === 0) {
      setValue((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "deviceType" && e === '') {
      setValue((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "eventId") {
      const eventIdValue = parseInt(e);
      setFilter({ ...filter, [name]: eventIdValue });
    } else {
      setFilter({ ...filter, [name]: e });
    }
  };

  const applyFilters = () => {
    let updatedData = data;

    if (filter.priority !== 0) {
      updatedData = updatedData.filter(
        (item) => item.priority === filter.priority
      );
    }
    if (filter.daterange) {
      const [startDate, endDate] = filter.daterange;
      updatedData = updatedData.filter(
        (item) =>
          new Date(item.dateTime) >= startDate &&
          new Date(item.dateTime) <= endDate
      );
    }
    if (filter.eventId) {
      updatedData = updatedData.filter(
        (item) => parseInt(item.eventid) === filter.eventId
      );
    }
    if (filter.deviceType) {
      updatedData = updatedData.filter(
        (item) => item.deviceType === filter.deviceType
      );
    }
    if (filter.eventType) {
      updatedData = updatedData.filter(
        (item) => item.eventType === filter.eventType
      );
    }

    setFilteredData(updatedData);
  };

  const handleApplyFilters = () => {
    applyFilters();
    alert(JSON.stringify(filter));
    setFilterData(filteredData);
    setisfilterOPen(false);
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
          width: "22%",
          height: "72%",
          margin: "auto",
          borderRadius: "10px",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>Filter Column</div>
        <IoMdClose onClick={() => setisfilterOPen(false)} size={20} />
      </div>
      <div>
        <div>
          <label>{value.length} Filters Applied</label>
        </div>
        <div>
          {value.map((item) => (
            <Button key={item}>
              {item}
              <CloseOutlineIcon
                id={item}
                onClick={handlesingleReset}
                style={{ marginLeft: "10px" }}
              />
            </Button>
          ))}
        </div>
        <div className="select-container">
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
          <InputNumber
            placeholder="Select some id"
            onChange={(e) => handleChange(e, "eventId")}
            value={filter.eventId}
          />
        </div>
        <div>
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
        <div>
          <label>Device Type </label>
          <InputPicker
            data={updateDeviceType}
            style={{ width: "100%" }}
            onChange={(e) => handleChange(e, "deviceType")}
            defaultValue={0}
            value={filter.deviceType}
          />
        </div>
      </div>

      <div
        style={{
          gap: 5,
          display: "flex",
          justifyContent: "end",
          marginTop: "20px",
        }}
      >
        <Button appearance="primary" color="violet" onClick={handleReset}>
          Reset
        </Button>
        <Button appearance="primary" color="cyan" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </Modal>
  );
}

export default FilterDialog;
