import { axiosInstance } from "./axiosInstance";

const apiCallingProcess = async (method, route, payload = null) => {
  try {
    const response = await axiosInstance[method](route, payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//sell product
export const sellProduct = async (payload) => {
  return apiCallingProcess("post", "/create-product", payload);
};

//get product
export const getAllProducts = async () => {
  return apiCallingProcess("get", "/products");
};

//get old product
export const getOldProduct = async (id) => {
  return apiCallingProcess("get", `/products/${id}`);
};

//update product
export const updateProduct = async (payload) => {
  return apiCallingProcess("put", "/update-product", payload);
};

//delete product
export const deleteProduct = async (id) => {
  return apiCallingProcess("delete", `/products/${id}`);
};

//upload image
export const uploadImage = async (formData) => {
  return apiCallingProcess("post", "/upload", formData);
};

//get saved product images
export const getSavedImages = async (id) => {
  return apiCallingProcess("get", `/product-images/${id}`);
};

//delete saved product images
export const deletedSavedProductImages = async (payload) => {
  const { productId, imgToDelete } = payload;
  const encodeImgToDelete = encodeURIComponent(imgToDelete);
  try {
    const response = await axiosInstance.delete(
      `/products/images/destroy/${productId}/${encodeImgToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
