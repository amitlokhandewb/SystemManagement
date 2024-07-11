import axios from "axios";
import { APIURL } from "../Utilities/Data";

const fetchEventList = async (page,pageLimit ) => {
  const response = await axios.get(`${APIURL}Events/GetAllEvents/${page}/${pageLimit}`);
  const data = await response.data;
  return data;
};
const CreateRandomEvent = async () => {
    const response = await fetch(`${APIURL}Events/CreateRandomEventAsync`);
    const data = await response.json();
    return data;
  };
export { fetchEventList , CreateRandomEvent };
