import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const fetchUserList = async () => {
  try {
    const response = await axios.get(
      `${API_URL}EndUser/GetEndUsersAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const FetchUserbyId = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}EndUser/GetEndUserByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const UpdateUseer = async (data, id) => {
  try {
    const response = await axios.put(
      `${API_URL}EndUser/UpdateEndUserAsync/${id}`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreateUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}EndUser/CreateEndUserAsync`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DeleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}EndUser/DeleteEndUserAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
