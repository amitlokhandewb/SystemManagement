import { APIURL } from "../Utilities/Data";

const fetchEventDescriptions = async () => {
    const response = await fetch(`${APIURL}Common/GetEventDescriptionsAsync`);
    const data = await response.json();
    return data;
  };

  export { fetchEventDescriptions }