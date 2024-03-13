/* eslint-disable react/prop-types */
import { message } from "antd";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getFilteredProducts } from "../../apicalls/public";
import { setLoader } from "../../store/slices/loaderSlice";

const Hero = ({ setProducts, getProducts }) => {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (searchKey.trim().length === 0) {
      return message.error("SearchKey must have.");
    }
    dispatch(setLoader(true));
    try {
      const response = await getFilteredProducts("searchKey", searchKey);
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  const handleClear = () => {
    setSearchKey("");
    getProducts();
  };

  return (
    <div className="space-y-5 text-center">
      <h1 className="pt-10 text-5xl font-bold text-blue-600">
        "Discover, Connect, and Thrive with TradeHub."
      </h1>
      <p className="max-w-xl mx-auto text-lg font-medium text-gray-500">
        Brings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className="flex max-w-sm gap-2 mx-auto ">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full text-sm text-gray-900 bg-gray-200 border-none rounded-lg focus:ring-0"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <IoSearchOutline
            className="absolute text-xl cursor-pointer right-2 top-2"
            onClick={handleSearch}
          />
        </div>
        {searchKey && (
          <button
            type="button"
            className="px-2 py-1 text-white bg-blue-500 rounded-md"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
export default Hero;
