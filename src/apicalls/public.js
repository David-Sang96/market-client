import { axiosInstance } from "./axiosInstance";

//get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};