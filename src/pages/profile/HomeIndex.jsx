/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { FaLuggageCart } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { LiaUserSolid } from "react-icons/lia";
import { MdManageHistory } from "react-icons/md";
import { getAllNotifications } from "../../apicalls/notification";
import { getAllProducts } from "../../apicalls/product";
import General from "./General";
import ManageProduct from "./ManageProduct";
import Notification from "./Notification";
import ProductsList from "./ProductsList";

const HomeIndex = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [uploadTabKey, setUploadTabKey] = useState("1");
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [notiStatus, setNotiStatus] = useState(0);

  const getProducts = async (page = 1, perPage = 10) => {
    try {
      const response = await getAllProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.productDoc);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await getAllNotifications();
      if (response.isSuccess) {
        setNotifications(response.notificationDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
      setNotifications([]);
    }
  };

  const unReadNotis = () => {
    const filtered = notifications.filter((item) => item.isRead === false);
    setNotiStatus(filtered.length);
  };

  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts(1, 10);
    getNotifications();
  }, [activeTabKey]);

  useEffect(() => {
    unReadNotis();
  }, [notifications]);

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-3 text-base">
          <FaLuggageCart />
          Products
        </span>
      ),
      children: (
        <ProductsList
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setUploadTabKey={setUploadTabKey}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-3 text-base">
          <MdManageHistory />
          Manage Product
        </span>
      ),
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
      label: (
        <span className="flex items-center gap-3 text-base">
          <IoNotifications />
          Notification
          <span className="font-medium text-red-500">{notiStatus}</span>
        </span>
      ),
      children: (
        <Notification
          notifications={notifications}
          activeTabKey={activeTabKey}
          setEditMode={setEditMode}
          getNotifications={getNotifications}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-center gap-3 text-base">
          <LiaUserSolid />
          Profile
        </span>
      ),
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
