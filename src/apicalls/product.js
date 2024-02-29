import { axiosInstance } from "./axiosInstance";

//sell product
export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get product
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get old product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update product
export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.put(`/update-product`, payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//upload image
export const uploadImage = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get saved product images
export const getSavedImages = async (id) => {
  try {
    const response = await axiosInstance.get("/product-images/" + id, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
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
