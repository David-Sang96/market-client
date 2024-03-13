/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Pagination, message } from "antd";
import { format } from "date-fns";
import { deleteProduct } from "../../apicalls/product";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
  setUploadTabKey,
  currentPage,
  totalPages,
}) => {
  const handleEdit = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
  };
  const handleUpload = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
    setUploadTabKey("2");
  };

  const handleDelete = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
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

  const handlePagination = (page, perPage) => {
    getProducts(page, perPage);
  };

  return (
    <section>
      <h2 className="py-3 text-3xl font-semibold">Products List</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
                    <td className="px-6 py-4">
                      {product.category.replaceAll("_", " ")}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(product.createdAt), "dd-MM-yyyy")}
                    </td>{" "}
                    <td className="px-6 py-4">
                      <span
                        className={`p-1 text-xs text-white  rounded-md ${
                          product.status === "pending"
                            ? " bg-orange-500"
                            : product.status === "approve"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="font-medium text-gray-600 hover:underline "
                          onClick={() => handleUpload(product._id)}
                        >
                          Upload
                        </button>
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>No Products added yet</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          defaultCurrent={currentPage}
          total={totalPages * 10}
          onChange={handlePagination}
        />
      </div>
    </section>
  );
};

export default Products;
