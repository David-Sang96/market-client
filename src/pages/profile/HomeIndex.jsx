import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";
import General from "./General";
import ManageProduct from "./ManageProduct";
import ProductsList from "./ProductsList";

const HomeIndex = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [uploadTabKey, setUploadTabKey] = useState("1");

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDoc);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <ProductsList
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setUploadTabKey={setUploadTabKey}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          setEditMode={setEditMode}
          editMode={editMode}
          editProductId={editProductId}
          uploadTabKey={uploadTabKey}
        />
      ),
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: (
        <General setEditMode={setEditMode} activeTabKey={activeTabKey} />
      ),
    },
  ];
  const handleOnChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={(key) => handleOnChange(key)}
      items={items}
      tabPosition="left"
      size="large"
      className="min-h-screen"
    />
  );
};

export default HomeIndex;
