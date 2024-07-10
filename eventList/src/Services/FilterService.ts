import { APIURL } from "../Utilities/Data";

const sendFilter = async (data) => {
    const response = await fetch(`${APIURL}EventFilter/Filter`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      return result;
}
export { sendFilter }