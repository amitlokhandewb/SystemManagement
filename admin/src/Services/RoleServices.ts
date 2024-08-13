import axios from "axios";
import { GetToken } from "../Utils/GenricMethod";
import { API_URL } from "../Utils/Util";

export const fetchRolesAsync = async () => {
    try {
      const response = await axios.get(
        `${API_URL}UserRole/GetUserRolesAsync`,
        GetToken()
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };