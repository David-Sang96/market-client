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

// register new account
export const registerUser = async (payload) => {
  return apiCallingProcess("post", "/register", payload);
};

// login account
export const loginUser = async (payload) => {
  return apiCallingProcess("post", "/login", payload);
};

//check authenticated user
export const checkCurrentUser = async () => {
  return apiCallingProcess("get", "/get-current-user");
};
