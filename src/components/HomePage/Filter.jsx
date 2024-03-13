/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFilteredProducts } from "../../apicalls/public";
import { setLoader } from "../../store/slices/loaderSlice";

const Filter = ({ setProducts, getProducts }) => {
  const [categories, setCategories] = useState([]);
  const [uniqueCategoryNames, setUniqueCategoryNames] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (item) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  const capitalizeEveryWord = (item) => {
    return item
      .split("_")
      .map((e) => capitalizeFirstLetter(e))
      .join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        const dataFromServer = await response.json();
        if (dataFromServer.isSuccess) {
          setCategories(dataFromServer.productDocs);
        } else {
          throw new Error(dataFromServer.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //get category names for UI
    const uniqueNames = Array.from(
      new Set(categories.map((item) => capitalizeEveryWord(item.category)))
    );
    setUniqueCategoryNames(uniqueNames);

    // get category names for search api
    const filterUnique = [...new Set(categories.map((item) => item.category))];
    setUniqueNames(filterUnique);
  }, [categories]);

  const handleCategory = async (i) => {
    setSelectedCategory(i);
    dispatch(setLoader(true));
    try {
      const response = await getFilteredProducts("category", uniqueNames[i]);
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
    setSelectedCategory(null);
    getProducts();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mx-auto my-8 max-w-7xl ">
      {uniqueCategoryNames.length > 0 &&
        uniqueCategoryNames.map((category, index) => (
          <div
            key={index}
            className={`px-2 py-1 text-white bg-blue-500 cursor-pointer rounded-xl ${
              index === selectedCategory && "bg-red-500"
            }`}
            onClick={() => handleCategory(index)}
          >
            <p>{category}</p>
          </div>
        ))}
      {selectedCategory !== null && (
        <button
          className="px-2 py-1 text-white bg-blue-500 cursor-pointer rounded-xl "
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
