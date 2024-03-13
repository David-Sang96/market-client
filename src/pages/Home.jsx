/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedProducts } from "../apicalls/product";
import { getAllProducts } from "../apicalls/public";
import Card from "../components/HomePage/Card";
import Filter from "../components/HomePage/Filter";
import Hero from "../components/HomePage/Hero";
import Loader from "../components/loader";
import { setLoader } from "../store/slices/loaderSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);

  const getProducts = async (page = 1, perPageProducts = 4) => {
    dispatch(setLoader(true));
    try {
      const response = await getAllProducts(page, perPageProducts);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  const getAllSavedProducts = async () => {
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
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    getProducts(1, 4);
    getAllSavedProducts();
  }, []);

  const handlePagination = (page, perPage) => {
    console.log(page, perPage);
    getProducts(page, perPage);
  };

  return (
    <section>
      <Hero setProducts={setProducts} getProducts={getProducts} />
      <Filter setProducts={setProducts} getProducts={getProducts} />
      {isProcessing ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 mx-auto max-w-7xl">
            {products.map((product) => (
              <Card
                product={product}
                key={product._id}
                allSavedProducts={savedProducts}
                getHomeProducts={getProducts}
              />
            ))}
          </div>
          <div className="flex justify-end mx-auto mt-5 max-w-7xl">
            <Pagination
              current={currentPage}
              total={totalPages * 10}
              onChange={handlePagination}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
