import { axiosInstance } from "./axiosInstance.js";

const apiCallProcess = async (method, end_point) => {
  try {
    const response = await axiosInstance[method](end_point, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all products
export const getAllProducts = async () => {
  return apiCallProcess("get", "/admin/products");
};

export const approveProduct = async (id) => {
  return apiCallProcess("post", `/admin/product-approve/${id}`);
};

export const rejectProduct = async (id) => {
  return apiCallProcess("post", `/admin/product-reject/${id}`);
};

export const rollBackProduct = async (id) => {
  return apiCallProcess("post", `/admin/product-rollback/${id}`);
};

//get all users
export const getAllUsers = async () => {
  return apiCallProcess("get", "/admin/users");
};

export const banUser = async (id) => {
  return apiCallProcess("post", `/admin/user-ban/${id}`);
};

export const unBanUser = async (id) => {
  return apiCallProcess("post", `/admin/user-unban/${id}`);
};
