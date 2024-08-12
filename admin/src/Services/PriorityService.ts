import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchPriority = async () => {
  try {
    const response = await axios.get(
      `${API_URL}Priority/GetPrioritiesAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const GetPriorityByIdAsync = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}Priority/GetPriorityByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreatePriorityAsync = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}Priority/CreatePriorityAsync`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const UpdatePriority = async (data, id) => {
  try {
    const response = await axios.put(
      `${API_URL}Priority/UpdatePriorityAsync/${id}`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DeletePriorityAsync = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}Priority/DeletePriorityAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};