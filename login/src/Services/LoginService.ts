import axios from "axios";

export const LoginAsync = async (data: any) => {
  try {
    const response = axios.post(
      `https://localhost:7105/api/Auth/login?email=${data.email}&password=${data.password}`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
