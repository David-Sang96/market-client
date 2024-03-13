import { axiosInstance } from "./axiosInstance.js";

const apiCallProcess = async (method, route) => {
  try {
    const response = await axiosInstance[method](route, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all products
export const getAllProducts = async (page, perPage) => {
  return apiCallProcess(
    "get",
    `/admin/products?page=${page}&perPage=${perPage}`
  );
};

export const getProductsForBar = async () => {
  try {
    const response = await axiosInstance.get("/admin/products-by-categories", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const approveProduct = async (id) => {
  // return apiCallProcess("post", `/admin/product-approve/${id}`);
  try {
    const response = await axiosInstance.post(`/admin/product-approve/${id}`, {
      validateStatus: () => true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const rejectProduct = async (id) => {
  // return apiCallProcess("post", `/admin/product-reject/${id}`);
  try {
    const response = await axiosInstance.post(`/admin/product-reject/${id}`, {
      validateStatus: () => true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const rollBackProduct = async (id) => {
  return apiCallProcess("post", `/admin/product-rollback/${id}`);
};

//get all users
export const getAllUsers = async () => {
  return apiCallProcess("get", "/admin/users");
};

export const banUser = async (id) => {
  // return apiCallProcess("post", `/admin/user-ban/${id}`);
  try {
    const response = await axiosInstance.post(`/admin/user-ban/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const unBanUser = async (id) => {
  return apiCallProcess("post", `/admin/user-unban/${id}`);
};
