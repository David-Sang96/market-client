import { axiosInstance } from "./axiosInstance";

const apiCallingProcess = async (route) => {
  try {
    const response = await axiosInstance.get(route, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all products
export const getAllProducts = async (page, perPageProducts) => {
  return apiCallingProcess(
    `/api/products?page=${page}&perPageProducts=${perPageProducts}`
  );
};

//get products by filters
export const getFilteredProducts = async (key, value) => {
  return apiCallingProcess(`/api/products/filters?${key}=${value}`);
};

//get product by id
export const getProductById = async (id) => {
  return apiCallingProcess(`/api/product/${id}`);
};
