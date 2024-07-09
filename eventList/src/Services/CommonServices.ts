import { APIURL } from "../Utilities/Data";

const fetchEventDescriptions = async () => {
    const response = await fetch(`${APIURL}Common/GetEventDescriptionsAsync`);
    const data = await response.json();
    return data;
  };
  const fetchDevices = async () => {
    const response = await fetch(`${APIURL}Common/GetDeviceTypesAsync`);
    const data = await response.json();
    return data;
  };

  export { fetchEventDescriptions , fetchDevices}