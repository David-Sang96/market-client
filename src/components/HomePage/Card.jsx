/* eslint-disable react/prop-types */
import { CiBookmarkCheck } from "react-icons/ci";
import defaultImage from "../../image/trade.png";

const Card = ({ product }) => {
  console.log(product);
  return (
    <section className="space-y-2">
      {product.images[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[300px] rounded-lg object-cover"
        />
      ) : (
        <img
          src={defaultImage}
          alt={product.name}
          className="w-full h-[300px] rounded-md"
        />
      )}
      <div className="flex items-center justify-between">
        <p className="px-2 py-1 text-sm text-white bg-blue-500 rounded-lg w-fit">
          {product.category.toUpperCase().replaceAll("_", " ")}
        </p>
        <CiBookmarkCheck className="text-2xl text-blue-600 cursor-pointer" />
      </div>
      <p className="text-xl font-medium text-gray-700">{product.name}</p>
      <p className="text-sm text-gray-500 ">
        {product.description.slice(0, 80)}
      </p>
      <p className="text-gray-600 ">Product Owner - {product.seller.name}</p>
    </section>
  );
};

export default Card;
