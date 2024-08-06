import axios from "axios";
export const GetToken = () => {
  const tokenfromlocalstorage = localStorage.getItem("Token");
  return {
    headers: {
      Authorization: `Bearer ${tokenfromlocalstorage}`,
      "Content-Type": "application/json",
    },
  };
};
export const FetchActionBies = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7105/api/User/GetUsersAsync`,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const UpdateActionBies = async (data, id) => {
  try {
    const response = await axios.put(
      `https://localhost:7105/api/User/UpdateUserAsync/${id}`,
      data,
      GetToken()
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
