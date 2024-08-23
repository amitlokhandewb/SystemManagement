import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchActionBies = async () => {
  try {
    const response = await axios.get(
      `${API_URL}User/GetUsersAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const FetchActionByIdAsync = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}User/GetUsersByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const UpdateActionBies = async (data, id) => {
    const response = await axios.put(
      `${API_URL}User/UpdateUserAsync/${id}`,
      data,
      GetToken()
    );
    return response;
};
export const CreateActionBies = async (data) => {
  const response = await axios.post(
    `${API_URL}User/CreateUserAsync`,
    data,
    GetToken()
  );
  return response;
};
export const DeletectionByIdAsync = async (id) => {
    const response = await axios.delete(
      `${API_URL}User/DeleteUserAsync/${id}`,
      GetToken()
    );
    return response;
};
