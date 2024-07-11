import axios from "axios";
import { APIURL } from "../Utilities/Data";

const sendFilter = async (data, currentPage, itemsperpage) => {
  const response = await axios.post(
    `${APIURL}EventFilter/Filter/${currentPage}/${itemsperpage}`,
    data
  );
  const result = await response.data;
  return result;
};
export { sendFilter };
