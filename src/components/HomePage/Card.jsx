/* eslint-disable react/prop-types */
import { message } from "antd";
import { FaBookmark } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { savedProducts, unSavedProduct } from "../../apicalls/product";
import defaultImage from "../../image/trade.png";

const Card = ({ product, saved = false, getProducts }) => {
  const handleSaveProduct = async (id) => {
    try {
      const response = await savedProducts(id);
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleUnSaveProduct = async (id) => {
    try {
      const response = await unSavedProduct(id);
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

  return (
    <section className="px-3 py-2 space-y-2 bg-white rounded-md shadow-lg">
      {product.images[0] ? (
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[300px] rounded-lg object-cover"
          />
        </Link>
      ) : (
        <Link to={`/product/${product._id}`}>
          <img
            src={defaultImage}
            alt={product.name}
            className="w-full h-[300px] rounded-md"
          />
        </Link>
      )}

      <div className="flex items-center justify-between">
        <p className="px-2 py-1 my-1 text-sm text-white bg-blue-500 rounded-lg w-fit">
          {product.category.toUpperCase().replaceAll("_", " ")}
        </p>
        {!saved ? (
          <FaBookmark
            className="text-xl text-blue-600 cursor-pointer"
            title="save"
            onClick={() => handleSaveProduct(product._id)}
          />
        ) : (
          <GoBookmarkSlashFill
            title="unsaved"
            className="text-2xl text-blue-600 cursor-pointer"
            onClick={() => handleUnSaveProduct(product._id)}
          />
        )}
      </div>
      <Link to={`/product/${product._id}`}>
        <p className="text-xl font-semibold text-gray-700">{product.name}</p>
      </Link>
      <p className="text-sm text-gray-600 ">
        {product.description.slice(0, 80)}
      </p>
      <hr />
      <p className="text-lg font-medium text-right">RM {product.price}</p>
    </section>
  );
};

export default Card;
