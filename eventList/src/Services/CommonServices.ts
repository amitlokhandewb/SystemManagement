import axios from "axios";
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
  try {
    const response = axios.get(`${APIURL}Common/GetEventDescriptionsAsync`,GetToken());
    return response;
  } catch (error) {
    console.error(`error for fetcing event description`);
  }
};

const fetchEventTypes = async () => {
  try {
    const response =await axios.get(`${APIURL}EventType/GetEventTypeAsync`,GetToken());
    return response;
  } catch (error) {
    console.log("failes to fetch eventtypes", error.message);
  }
};
const fetchDeviceTypes = async () => {
  try {
    const response = await axios.get(`${APIURL}DeviceType/GetAllDeviceTypeAsync`,GetToken());
    return response;
  } catch (error) {
    console.log("failes to fetch eventype", error.message);
  }
};
const fetchPriorities = async () => {
  try {
    const response = await axios.get(`${APIURL}Priority/GetPrioritiesAsync`,GetToken());
    return response;
  } catch (error) {
    console.log("failes to fetch priorities", error.message);
  }
};

const fetchDevices = async () => {
  try {
    const response = await axios.get(`${APIURL}Common/GetDeviceTypesAsync`,GetToken());
    return response;
  } catch (error) {
    console.log("failes to fetch devices", error.message);
  }
};

export {
  fetchEventDescriptions,
  fetchDevices,
  fetchEventTypes,
  fetchDeviceTypes,
  fetchPriorities,
};
