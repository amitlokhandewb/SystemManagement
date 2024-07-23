import axios from "axios";
import { APIURL } from "../Utilities/Data";
import { GetToken } from "./CommonServices";

const sendFilter = async (data, currentPage, itemsperpage) => {
  const response = await axios.post(
    `${APIURL}EventFilter/Filter/${currentPage}/${itemsperpage}`,
    data,GetToken()
  );
  const result = await response.data;
  return result;
};
export { sendFilter };
