import { API_URL } from "../Util";

export const GetToken = () => {
    const tokenfromlocalstorage = localStorage.getItem("Token");
    return {
      headers: {
        Authorization: `Bearer ${tokenfromlocalstorage}`,
        "Content-Type": "application/json",
      },
    };
  };
  
  export const fetchRolemappingListById = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}RoleMapping/GetComponentsByRoleId/${id}`,
        {
          method: 'GET', 
          ...GetToken(), 
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json(); 
    } catch (error) {
      console.error('Error fetching role mapping list:', error);
      throw error; 
    }
  };
  