/* eslint-disable react/prop-types */
import { Pagination, message } from "antd";
import { format } from "date-fns";
import {
  approveProduct,
  rejectProduct,
  rollBackProduct,
} from "../../apicalls/admin";

const ProductsList = ({ products, getProducts, currentPage, totalPages }) => {
  const responseProcess = async (methodName) => {
    try {
      const response = await methodName;
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleApprove = async (productId) => {
    responseProcess(approveProduct(productId));
  };

  const handleReject = async (productId) => {
    responseProcess(rejectProduct(productId));
  };

  const handleRollBack = async (productId) => {
    responseProcess(rollBackProduct(productId));
  };

  const handlePagination = (page, perPage) => {
    getProducts(page, perPage);
  };

  return (
    <section>
      <h2 className="py-3 text-3xl font-semibold">Products List</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 bg-white rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr key={product._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.seller.name}</td>
                    <td className="px-6 py-4">
                      {format(new Date(product.createdAt), "dd-MM-yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`p-1 text-xs rounded-md font-semibold text-white ${
                          product.status === "pending"
                            ? " bg-orange-400"
                            : product.status === "approve"
                            ? " bg-green-400"
                            : " bg-red-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-x-4">
                        {product.status === "approve" ? (
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:underline"
                            onClick={() => handleRollBack(product._id)}
                          >
                            Roll Back
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:underline "
                            onClick={() => handleApprove(product._id)}
                          >
                            Approve
                          </button>
                        )}
                        {product.status === "reject" ? (
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:underline"
                            onClick={() => handleRollBack(product._id)}
                          >
                            Roll Back
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:underline"
                            onClick={() => handleReject(product._id)}
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>No Products To Manage</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-5">
        <Pagination
          defaultCurrent={currentPage}
          total={totalPages * 10}
          onChange={handlePagination}
        />
      </div>
    </section>
  );
};

export default ProductsList;
