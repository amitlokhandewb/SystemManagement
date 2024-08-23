import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchEventDescripton = async () => {
  try {
    const response = await axios.get(
      `${API_URL}EventDescription/GetEventDescriptipnAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const FetchEventDescriptionById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}EventDescription/GetEventDescriptipnByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreateEventDescriptionAsync = async (data) => {
    const response = await axios.post(
      `${API_URL}EventDescription/CreateEventDescriptionAsync`,
      data,
      GetToken()
    );
    return response;
};
export const UpdateEventDescripton = async (data, id) => {
    const response = await axios.put(
      `${API_URL}EventDescription/UpdateEventDescriptionAsync/${id}`,
      data,
      GetToken()
    );
    return response;
};
export const DeleteEvenetDescriptionAsync = async (id) => {
    const response = await axios.delete(
      `${API_URL}EventDescription/DeleteEvenetDescriptionAsync/${id}`,
      GetToken()
    );
    return response;
};