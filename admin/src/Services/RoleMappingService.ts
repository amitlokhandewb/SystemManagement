import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const fetchRolemappingListByid = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}RoleMapping/GetComponentsByRoleId/${id}`,
      GetToken()
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

  export const GetRoleMappingAsync = async () => {
    try {
      const response = await axios.get(
        `${API_URL}RoleMapping/GetAllRoleMapping/`,
        GetToken()
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export const GetRoleMapByDropDownAsync = async () => {
    try {
      const response = await axios.get(
        `${API_URL}RoleMapping/GetRoleMapByDropDownAsync/`,
        GetToken()
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
export const ToggleRole = async (id, type, typevalue) => {
  try {
    const response = await axios.put(
      `${API_URL}RoleMapping/ToggleRoleMapping/${id}?type=${type}&typevalue=${typevalue}`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const AddComponent = async (data: any) => {
      const response = await axios.post(
        `${API_URL}RoleMapping/AddComponents?component=${data.component}&parentId=${data.parentId}`,data,
        GetToken()
      );
      return response;
  };
