/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../apicalls/public";
import Card from "../components/HomePage/Card";
import Filter from "../components/HomePage/Filter";
import Hero from "../components/HomePage/Hero";
import Loader from "../components/loader";
import { setLoader } from "../store/slices/loaderSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((store) => store.reducer.loader);

  const getProducts = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getAllProducts();
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <Hero setProducts={setProducts} getProducts={getProducts} />
      <Filter setProducts={setProducts} getProducts={getProducts} />
      {isProcessing ? (
        <Loader />
      ) : (
        <div className="grid max-w-6xl grid-cols-3 gap-3 mx-auto ">
          {products.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
