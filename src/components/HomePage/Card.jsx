/* eslint-disable react/prop-types */
import { message } from "antd";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savedProducts, unSavedProduct } from "../../apicalls/product";
import defaultImage from "../../image/trade.png";

const Card = ({
  product,
  saved = false,
  getSavedProducts,
  allSavedProducts,
  getHomeProducts,
}) => {
  const { user } = useSelector((store) => store.reducer.user);

  const handleSaveProduct = async (id) => {
    try {
      const response = await savedProducts(id);
      if (response.isSuccess) {
        message.success(response.message);
        getHomeProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message || "Product is already saved.");
    }
  };

  const handleUnSaveProduct = async (id) => {
    try {
      const response = await unSavedProduct(id);
      if (response.isSuccess) {
        message.success(response.message);
        getSavedProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const findAlreadySavedProducts = (id) => {
    return allSavedProducts.find((p) => p.product_id._id === id);
  };
  return (
    <section className="px-3 py-2 space-y-2 bg-white rounded-md shadow-lg ">
      {product.images[0] ? (
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[250px] rounded-lg object-cover"
          />
        </Link>
      ) : (
        <Link to={`/product/${product._id}`}>
          <img
            src={defaultImage}
            alt={product.name}
            className="w-full h-[250px] rounded-md"
          />
        </Link>
      )}

      <div className="flex items-center justify-between">
        <p className="px-2 py-1 my-1 text-xs text-white bg-blue-500 rounded-lg w-fit">
          {product.category.toUpperCase().replaceAll("_", " ")}
        </p>
        {user && (
          <>
            {!saved ? (
              <>
                {findAlreadySavedProducts(product._id) ? (
                  <FaBookmark
                    className="text-lg text-blue-600 cursor-pointer"
                    onClick={() => message.warning("Product is already saved.")}
                  />
                ) : (
                  <CiBookmark
                    className="text-xl text-blue-600 cursor-pointer"
                    title="save"
                    onClick={() => handleSaveProduct(product._id)}
                  />
                )}
              </>
            ) : (
              <GoBookmarkSlashFill
                title="unsaved"
                className="text-xl text-blue-600 cursor-pointer"
                onClick={() => handleUnSaveProduct(product._id)}
              />
            )}
          </>
        )}
      </div>
      <Link to={`/product/${product._id}`}>
        <p className="text-xl font-semibold text-gray-700">{product.name}</p>
      </Link>
      <p className="text-sm text-gray-600 ">
        {product.description.slice(0, 80)}
      </p>
      <hr />
      <p className="font-medium text-right ">RM {product.price}</p>
    </section>
  );
};

export default Card;
