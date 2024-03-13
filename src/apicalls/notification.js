import { axiosInstance } from "./axiosInstance";

export const createNotification = async (payload) => {
  try {
    const response = await axiosInstance.post("/notify", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axiosInstance.get("/notifications", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateMarkAsRead = async (id) => {
  try {
    const response = await axiosInstance.post(`/notifications-read/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateMarkAsUnRead = async (id) => {
  try {
    const response = await axiosInstance.post(`/notifications-unread/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notifications-delete/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteAllNotifications = async () => {
  try {
    const response = await axiosInstance.delete(`/notifications-delete-all`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
