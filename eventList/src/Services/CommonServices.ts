import { APIURL } from "../Utilities/Data";

const fetchEventDescriptions = async () => {
    const response = await fetch(`${APIURL}Common/GetEventDescriptionsAsync`);
    const data = await response.json();
    return data;
  };

  const fetchEventTypes = async () => {
    const response = await fetch(`${APIURL}EventType/GetEventTypeAsync`);
    const data = await response.json();
    return data;
  };
  const fetchDeviceTypes = async () => {
    const response = await fetch(`${APIURL}DeviceType/GetAllDeviceTypeAsync`);
    const data = await response.json();
    return data;
  };
  const fetchPriorities = async () => {
    const response = await fetch(`${APIURL}Priority/GetPrioritiesAsync`);
    const data = await response.json();
    return data;
  };

  const fetchDevices = async () => {
    const response = await fetch(`${APIURL}Common/GetDeviceTypesAsync`);
    const data = await response.json();
    return data;
  };

  export { fetchEventDescriptions , fetchDevices, fetchEventTypes, fetchDeviceTypes,fetchPriorities }