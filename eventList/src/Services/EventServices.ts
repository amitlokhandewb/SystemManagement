import { APIURL } from "../Utilities/Data";

const fetchEventList = async () => {
  const response = await fetch(`${APIURL}Events/GetAllEvents`);
  const data = await response.json();
  return data;
};
const CreateRandomEvent = async () => {
    const response = await fetch(`${APIURL}Events/CreateRandomEventAsync`);
    const data = await response.json();
    return data;
  };
export { fetchEventList , CreateRandomEvent };
