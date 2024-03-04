/* eslint-disable react/prop-types */
import { CiBookmarkCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
import defaultImage from "../../image/trade.png";

const Card = ({ product }) => {
  return (
    <section className="space-y-2">
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
        <CiBookmarkCheck className="text-2xl text-blue-600 cursor-pointer" />
      </div>
      <Link to={`/product/${product._id}`}>
        <p className="text-xl font-semibold text-gray-700">{product.name}</p>
      </Link>
      <p className="text-sm text-gray-600 ">
        {product.description.slice(0, 80)}
      </p>
    </section>
  );
};

export default Card;
