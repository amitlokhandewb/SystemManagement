import { APIURL } from "../Utilities/Data";

export const GetToken = () => {
  const tokenfromlocalstorage = localStorage.getItem("Token");
  return {
    headers: {
      Authorization: `Bearer ${tokenfromlocalstorage}`,
      "Content-Type": "application/json",
    },
  };
};

const fetchEventDescriptions = async () => {
  const response = await fetch(`${APIURL}Common/GetEventDescriptionsAsync`,GetToken());
  const data = await response.json();
  return data;
};

const fetchEventTypes = async () => {
  const response = await fetch(`${APIURL}EventType/GetEventTypeAsync`,GetToken());
  const data = await response.json();
  return data;
};
const fetchDeviceTypes = async () => {
  const response = await fetch(`${APIURL}DeviceType/GetAllDeviceTypeAsync`,GetToken());
  const data = await response.json();
  return data;
};
const fetchPriorities = async () => {
  const response = await fetch(`${APIURL}Priority/GetPrioritiesAsync`,GetToken());
  const data = await response.json();
  return data;
};

const fetchDevices = async () => {
  const response = await fetch(`${APIURL}Common/GetDeviceTypesAsync`,GetToken());
  const data = await response.json();
  return data;
};

export {
  fetchEventDescriptions,
  fetchDevices,
  fetchEventTypes,
  fetchDeviceTypes,
  fetchPriorities,
};
