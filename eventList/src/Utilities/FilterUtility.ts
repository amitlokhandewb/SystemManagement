import { useState, useEffect } from "react";
import { sendFilter } from "../Services/FilterService";
import { fetchDeviceTypes, fetchEventTypes, fetchPriorities } from "../Services/CommonServices";

const iniitalFilter = {
  priority: 0,
  daterange: null,
  eventId: 0,
  deviceType: 0,
  eventType: 0,
};
export const FilterUtility = (
  setisfilterOPen,
  setFilterData,
  data,
  currentPageDeviceType,
  setFilterActive,
  setCurrentPage,
  setChip,
  chip,
  currentPage,
  itemsperpage,
  settotalPages
) => {
  const [filter, setFilter] = useState(iniitalFilter);
  const [previousfilter, setpreviousfilter] = useState(iniitalFilter);
  const [prevalue, setpreValue] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [evenTypes, setEventTYpes] = useState([]);
  const [deviceTYpes, setDeviceTYpes] = useState([]);
  const [priorities, setpriorities] = useState([]);

  let DeviceType = deviceTYpes?.map((item) => ({
    value: item.deviceTypeId,
    label: item.deviceName,
  }));
  let updateDeviceType = [{ value: "", label: "All" }, ...DeviceType];

  const handleclose = () => {
    setisfilterOPen(false);
    setFilter(previousfilter);
    setChip(prevalue);
  };
  const handleReset = () => {
    setFilter({
      priority: 0,
      daterange: null,
      eventId: 0,
      deviceType: 0,
      eventType: 0,
    });
    setChip([]);
    setpreviousfilter(iniitalFilter);
    setFilterActive(false);
    setisfilterOPen(false);
  };

  const handlesingleReset = (e) => {
    let id = e.target.id;
    if (id === "deviceType" || id === "eventType") {
      setFilter((prev) => ({ ...prev, [id]: 0 }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "priority") {
      setFilter((prev) => ({ ...prev, priority: 0 }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "daterange") {
      setFilter((prev) => ({ ...prev, daterange: null }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "eventId") {
      setFilter((prev) => ({ ...prev, eventId: 0 }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    }
    setResetTrigger((prev) => !prev);
  };

  const handleChange = (e, name) => {
    var exist = chip.find((item) => item === name);
    if (!exist) {
      setChip([...chip, name]);
    }
    if (name === "eventType" && e === 0) {
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "priority" && e === 0) {
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "deviceType" && e === 0) {
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "eventId" && e === 0) {
      setChip((prevValue) => prevValue.filter((item) => item !== name));
    }
    if (name === "daterange" && e === null) {
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
  useEffect(() => {
    applyFilters();
  }, [resetTrigger]);
  useEffect(() => {
    SendDataFilter();
  }, [currentPage, itemsperpage]);
  const fetchEventTYpes = async () => {
    const response = await fetchEventTypes();
    setEventTYpes(response);
  };
  const fetchDevices = async () => {
    const response = await fetchDeviceTypes();
    setDeviceTYpes(response);
  };
  const fetchPriority = async () => {
    const response = await fetchPriorities();
    setpriorities(response);
  };
  const applyFilters = () => {
    SendDataFilter();
    checkFilterActive();
    fetchEventTYpes();
    fetchDevices();
    fetchPriority();
  };
  useEffect(() => {
    fetchEventTYpes();
  }, []);
  async function SendDataFilter() {
    let startDate = null;
    let endDate = null;

    if (
      filter.daterange &&
      Array.isArray(filter.daterange) &&
      filter.daterange.length === 2
    ) {
      [startDate, endDate] = filter?.daterange;
    }

    const sendData = {
      priority: filter.priority,
      deviceType: filter.deviceType,
      eventType: filter.eventType,
      eventId: filter.eventId,
      startDate: startDate === null ? "" : startDate,
      endDate: endDate === null ? "" : endDate,
    };

    try {
      const response = await sendFilter(sendData, currentPage, itemsperpage);
      settotalPages(response.count);
      setFilterData(response.pagonatedData);
    } catch (error) {
      console.error("Error sending filter data:", error);
    }
  }

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
    setCurrentPage(1);
    setpreviousfilter(filter);
    setChip(chip);
    setisfilterOPen(false);
    applyFilters();
    setpreValue(chip);
  };

  return {
    handlesingleReset,
    handleChange,
    handleInputChange,
    updateDeviceType,
    handleReset,
    handleApplyFilters,
    handleclose,
    filter,
    evenTypes,
    priorities
  };
};
