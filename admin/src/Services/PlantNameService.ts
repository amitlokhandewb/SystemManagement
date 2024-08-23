import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const FetchPlantNames = async () => {
  try {
    const response = await axios.get(
      `${API_URL}PlantNameConrroller/GetPLantNamesAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const GetPLantNameByIdAsync = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}PlantNameConrroller/GetPLantNameByIdAsync/${id}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreatePlantNameAsycn = async (data) => {
    const response = await axios.post(
      `${API_URL}PlantNameConrroller/CreatePlantNameAsycn`,
      data,
      GetToken()
    );
    return response;
};
export const UpdatePlantName = async (data, id) => {
    const response = await axios.put(
      `${API_URL}PlantNameConrroller/UpdatePlantNameAsync/${id}`,
      data,
      GetToken()
    );
    return response;
};
export const DeletePlantNameAsync = async (id) => {
    const response = await axios.delete(
      `${API_URL}PlantNameConrroller/DeletePlantNameAsync/${id}`,
      GetToken()
    );
    return response;
};