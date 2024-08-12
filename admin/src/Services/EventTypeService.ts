import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchEventType= async () => {
  try {
    const response = await axios.get(
      `${API_URL}EventType/GetEventTypeAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const GetEventTypeByIdAsync = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}EventType/GetEventTypeByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreateEventTypeAsync = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}EventType/CreateEventTypeAsync`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const UpdateEventType= async (data, id) => {
  try {
    const response = await axios.put(
      `${API_URL}EventType/UpdateEventTypeAsync/${id}`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DeleteEventTypeAsync = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}EventType/DeleteEventTypeAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};