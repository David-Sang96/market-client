/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect, useState } from "react";

const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [uniqueCategoryNames, setUniqueCategoryNames] = useState([]);

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
    const uniqueNames = Array.from(
      new Set(categories.map((item) => capitalizeEveryWord(item.category)))
    );
    setUniqueCategoryNames(uniqueNames);
  }, [categories]);

  return (
    <div className="flex flex-wrap items-center justify-center max-w-5xl gap-3 mx-auto my-8 ">
      {uniqueCategoryNames.length > 0 &&
        uniqueCategoryNames.map((category, index) => (
          <div
            key={index}
            className="px-2 py-1 text-white bg-blue-500 rounded-xl"
          >
            <p>{category}</p>
          </div>
        ))}
    </div>
  );
};

export default Filter;
