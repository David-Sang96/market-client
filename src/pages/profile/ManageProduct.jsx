/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import ProductForm from "../../components/ProductManage/ProductForm";
import Upload from "../../components/ProductManage/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  setEditMode,
  uploadTabKey,
}) => {
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
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey={uploadTabKey} items={items} />;
};

export default ManageProduct;
