import axios from "axios";

export const RegisterAsync = async (data: any) => {
  try {
    const response = await axios.post(
      `https://localhost:7105/api/Auth/Register`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
