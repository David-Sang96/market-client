/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSavedProducts } from "../../apicalls/product";
import Card from "../../components/HomePage/Card";
import Loader from "../../components/loader";
import { setLoader } from "../../store/slices/loaderSlice";

const SavedProduct = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);

  const getProducts = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getSavedProducts();
      if (response.isSuccess) {
        setSavedProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <h1 className="pt-2 pb-6 text-3xl font-semibold text-center text-blue-500">
        Saved Products List
      </h1>
      {isProcessing ? (
        <Loader />
      ) : (
        <>
          {savedProducts && savedProducts.length > 0 && (
            <div className="grid grid-cols-4 gap-3 gap-y-4">
              {savedProducts.map((product) => (
                <Card
                  product={product.product_id}
                  key={product._id}
                  saved={true}
                  getProducts={getProducts}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SavedProduct;
