import { useState, useEffect } from "react";

const iniitalFilter = {
  priority: 0,
  daterange: null,
  eventId: 0,
  deviceType: "",
  eventType: "",
}
export const FilterUtility = (
  setisfilterOPen,
  setFilterData,
  data,
  currentPageDeviceType,
  setFilterActive,
  setCurrentPage,
  setChip,
  chip,
  setFilter,
  filter
) => {
  // const [filter, setFilter] = useState(iniitalFilter);
  const [previousfilter, setpreviousfilter] = useState(iniitalFilter);
  // const [value, setValue] = useState([]);
  const [prevalue, setpreValue] = useState([]);

  let DeviceType = currentPageDeviceType.map((item) => ({
    value: item,
    label: item,
  }));
  let updateDeviceType = [{ value: "", label: "All" }, ...DeviceType];

  const handleclose = () => {
    setisfilterOPen(false);
    setFilter(previousfilter)
    // setValue(prevalue);
    setChip(prevalue);
  }


  const handleReset = () => {
    setFilter({
      priority: 0,
      daterange: null,
      eventId: 0,
      deviceType: "",
      eventType: "",
    });
    // setValue([]);
    setChip([]);
    // setFilteredData(data);
    setpreviousfilter(iniitalFilter)
    setFilterActive(false);
    setisfilterOPen(false);
  };

  // const handlesingleReset = (e) => {
  //   let id = e.target.id;
  //   if (id === "deviceType" || id === "eventType") {
  //     setFilter((prev) => ({ ...prev, [id]: "" }));
  //     setChip((prevValue) => prevValue.filter((item) => item !== id));
  //   } else if (id === "priority") {
  //     setFilter((prev) => ({ ...prev, priority: 0 }));
  //     setChip((prevValue) => prevValue.filter((item) => item !== id));
  //   } else if (id === "daterange") {
  //     setFilter((prev) => ({ ...prev, daterange: null }));
  //     setChip((prevValue) => prevValue.filter((item) => item !== id));
  //   } else if (id === "eventId") {
  //     setFilter((prev) => ({ ...prev, eventId: 0 }));
  //     setChip((prevValue) => prevValue.filter((item) => item !== id));
  //   }
  //   // checkFilterActive();
  // };

  const handleChange = (e, name) => {
    var exist = chip.find((item) => item === name);
    if (!exist) {
      // setValue([...chip, name]);
      setChip([...chip, name]);
    }
    if (name === "eventType" && e === "") {
      // setValue((prevValue) => prevValue.filter((item) => item !== name));
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "priority" && e === 0) {
      // setValue((prevValue) => prevValue.filter((item) => item !== name));
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "deviceType" && e === "") {
      // setValue((prevValue) => prevValue.filter((item) => item !== name));
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "eventId" && e === 0) {
      // setValue((prevValue) => prevValue.filter((item) => item !== name));
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "daterange" && e === null) {
      // setValue((prevValue) => prevValue.filter((item) => item !== name));
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "eventId") {
      const eventIdValue = parseInt(e);
      setFilter({ ...filter, [name]: eventIdValue });
    } else {
      setFilter({ ...filter, [name]: e });
    }
    checkFilterActive();
  };

  const handleInputChange = (value) => {
    if (isNaN(value) || value === null || value === "") {
      handleChange(0, "eventId");
    } else {
      handleChange(value, "eventId");
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
    setFilterData(updatedData);
    checkFilterActive();
  };

  const checkFilterActive = () => {
    const isActive = Object.values(filter).some(
      (value) =>
        (typeof value === "number" && value !== 0) ||
        (typeof value === "string" && value !== "") ||
        (Array.isArray(value) && value !== null)
    );
    setFilterActive(isActive);
  };

  const handleApplyFilters = () => {
    setCurrentPage(0);
    setpreviousfilter(filter)
    setChip(chip);
    setisfilterOPen(false);
    applyFilters();
    alert(JSON.stringify(filter));
    // setFilterData(filteredData);
  };

  return {
    // handlesingleReset,
    handleChange,
    handleInputChange,
    updateDeviceType,
    handleReset,
    handleApplyFilters,
    handleclose,
  };
};
