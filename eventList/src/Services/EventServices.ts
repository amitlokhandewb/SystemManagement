import axios from "axios";
import { APIURL } from "../Utilities/Data";

const fetchEventList = async (page,pageLimit ) => {
 try {
    const response = await axios.get(`${APIURL}Events/GetAllEvents/${page}/${pageLimit}`);
    const data = await response.data;
    return data;
 } catch (error) {
    console.error(error)
 }
};
const CreateRandomEvent = async () => {
   try {
    const response = await fetch(`${APIURL}Events/CreateRandomEventAsync`);
    const data = await response.json();
    return data;
   } catch (error) {
    console.error(error)
   }
  };
export { fetchEventList , CreateRandomEvent };
