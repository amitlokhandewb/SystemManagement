import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchDeviceTypes = async () => {
  try {
    const response = await axios.get(
      `${API_URL}DeviceType/GetAllDeviceTypeAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const FetchDeviceTypeByIdAsync = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}DeviceType/GetDeviceTypeById/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreateDeviceTypeAsync = async (data) => {

    const response = await axios.post(
      `${API_URL}DeviceType/CreateDeviceTypeAsync`,
      data,
      GetToken()
    );
    return response.data;

};
export const UpdateDeviceTypes = async (data, id) => {
  try {
    const response = await axios.put(
      `${API_URL}DeviceType/UpdateDeviceTypeAsync/${id}`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DeleteDeviceTypeAsync = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}DeviceType/DeleteDeviceTypeAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};