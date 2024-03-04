import { message } from "antd";
import { useEffect, useState } from "react";
import { getAllProducts } from "../apicalls/public";
import Card from "../components/HomePage/Card";
import Filter from "../components/HomePage/Filter";
import Hero from "../components/HomePage/Hero";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log(response);
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <Hero setProducts={setProducts} getProducts={getProducts} />
      <Filter setProducts={setProducts} getProducts={getProducts} />
      <div className="grid max-w-4xl grid-cols-2 gap-3 mx-auto gap-y-6 ">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
