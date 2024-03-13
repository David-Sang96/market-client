/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { format } from "date-fns";
import { useEffect } from "react";
import { banUser, unBanUser } from "../../apicalls/admin";

const Users = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  const responseProcess = async (methodName) => {
    try {
      const response = await methodName;
      if (response.isSuccess) {
        message.success(response.message);
        getUsers();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleBan = async (userId) => {
    responseProcess(banUser(userId));
  };
  const handleUnBan = async (userId) => {
    responseProcess(unBanUser(userId));
  };

  return (
    <section>
      <h2 className="py-3 text-3xl font-semibold">Users List</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-7">
        <table className="w-full text-sm text-center text-gray-500 bg-white rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr key={user._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={` font-semibold ${
                          user.role === "admin"
                            ? "text-blue-600  italic "
                            : "text-green-500"
                        } ${user.status === "banned" && "text-red-500"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`p-1 text-xs rounded-md font-semibold ${
                          user.status === "active"
                            ? "text-black bg-green-400"
                            : "text-white bg-red-500"
                        } `}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(user.createdAt), "dd-MM-yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "active" ? (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline"
                          onClick={() => handleBan(user._id)}
                        >
                          Ban
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline"
                          onClick={() => handleUnBan(user._id)}
                        >
                          unBan
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>No users To Manage</p>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
