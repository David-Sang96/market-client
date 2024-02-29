/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../apicalls/admin";
import General from "./General";
import ProductsList from "./ProductsList";
import Users from "./Users";

const Home = () => {
  const { user } = useSelector((store) => store.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
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
  };

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  useEffect(() => {
    getProducts();
    isAdmin();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: <ProductsList products={products} getProducts={getProducts} />,
    },
    {
      key: "2",
      label: "Manage Users",
      children: <Users />,
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const handleOnChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => handleOnChange(key)}
        items={items}
        tabPosition="left"
        size="large"
        className="min-h-screen"
      />
    </section>
  );
};

export default Home;
