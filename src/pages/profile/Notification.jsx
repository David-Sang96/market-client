/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  deleteAllNotifications,
  deleteNotification,
  updateMarkAsRead,
  updateMarkAsUnRead,
} from "../../apicalls/notification.js";

const Notification = ({
  setEditMode,
  activeTabKey,
  notifications,
  getNotifications,
}) => {
  useEffect(() => {
    if (activeTabKey === "3") {
      setEditMode(false);
    }
    getNotifications();
  }, [activeTabKey, getNotifications]);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await updateMarkAsRead(id);
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleMarkAsUnRead = async (id) => {
    try {
      const response = await updateMarkAsUnRead(id);
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteNotification(id);
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllNotifications();
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section className="max-w-4xl">
      <div className="flex items-center justify-between my-2">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {!!notifications.length && (
          <div
            className="flex items-center gap-1 text-red-500 cursor-pointer "
            onClick={handleDeleteAll}
          >
            <p className="font-medium">Delete All</p>
            <RiDeleteBin2Line className="text-lg" />
          </div>
        )}
      </div>
      <div>
        {notifications.length === 0 && (
          <p className="font-medium text-red-500">No notifications yet.</p>
        )}
        {notifications.map((item) => (
          <div
            key={item._id}
            className={`${
              item.isRead ? "bg-white" : "bg-blue-100 "
            } p-2 mb-2 rounded-md shadow-lg`}
          >
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(item.createdAt))} ago ...
            </p>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p>{item.message}</p>
            <p className="pb-2">
              Contact -{" "}
              <span className="tracking-wide">{item.phone_number}</span>{" "}
            </p>
            <hr />
            <div className="flex justify-between ">
              <Link
                to={`/product/${item.product_id}`}
                className="font-medium text-blue-500"
              >
                View comment
              </Link>
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1 text-red-500 cursor-pointer "
                  onClick={() => handleDelete(item._id)}
                >
                  <p className="font-medium">Delete</p>
                  <RiDeleteBin2Line className="text-lg" />
                </div>
                <p
                  className="font-medium text-blue-500 cursor-pointer"
                  onClick={() =>
                    item.isRead
                      ? handleMarkAsUnRead(item._id)
                      : handleMarkAsRead(item._id)
                  }
                >
                  {item.isRead ? "Mark as unread" : "  Mark as read"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notification;
