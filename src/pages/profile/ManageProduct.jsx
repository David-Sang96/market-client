/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import Upload from "../../components/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  setEditMode,
}) => {
  const [activeKey, setActiveKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
          setEditMode={setEditMode}
        />
      ),
    },
    editMode && {
      key: "2",
      label: "Product Images",
      children: (
        <Upload
          editProductId={editProductId}
          setActiveTabKey={setActiveTabKey}
          setActiveKey={setActiveKey}
        />
      ),
    },
  ];
  const handleOnChange = (value) => {
    setActiveKey(value);
  };

  return (
    <Tabs
      defaultActiveKey={activeKey}
      onChange={(value) => handleOnChange(value)}
      items={items}
      tabPosition="top"
    />
  );
};

export default ManageProduct;
