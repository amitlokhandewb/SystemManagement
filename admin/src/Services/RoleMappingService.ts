import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const fetchRolemappingListByid = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}RoleMapping/GetComponentsByRoleId/${id}`,
        GetToken()
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };