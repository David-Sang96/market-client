/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSavedProducts } from "../../apicalls/product";
import Card from "../../components/HomePage/Card";
import Loader from "../../components/loader";
import { setLoader } from "../../store/slices/loaderSlice";

const SavedProduct = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);
  const navigate = useNavigate();

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
      console.error(error.message);
      setSavedProducts([]);
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="p-2 pb-4 text-xl font-semibold text-blue-500">
          Saved Products List
        </h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer "
          onClick={() => navigate(-1)}
        >
          <IoMdArrowBack className="" />
        </div>
      </div>
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
                  getSavedProducts={getProducts}
                />
              ))}
            </div>
          )}
        </>
      )}
      {savedProducts && savedProducts.length === 0 && !isProcessing && (
        <div className="text-center">
          <p className="text-xl ">No products are saved yet.</p>
          <button
            className="px-3 py-1 mt-3 text-white bg-blue-500 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Back to home
          </button>
        </div>
      )}
    </section>
  );
};

export default SavedProduct;
