/* eslint-disable react-hooks/exhaustive-deps */
import {
  BarChartOutlined,
  NotificationFilled,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { PiUsersFourDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getAllUsers,
  getProductsForBar,
} from "../../apicalls/admin";
import { getAllNotifications } from "../../apicalls/notification";

import Dashboard from "./Dashboard";
import General from "./General";
import Notification from "./Notification";
import ProductsList from "./ProductsList";
import Users from "./Users";

const Home = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [productsForBar, setProductsForBar] = useState([]);

  const { user } = useSelector((store) => store.reducer.user);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getProducts = async (page = 1, perPage = 10) => {
    try {
      const response = await getAllProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setTotalProducts(response.totalProductCount);
        setPendingProducts(response.pendingProducts);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getProductsForCategoriesBar = async () => {
    try {
      const response = await getProductsForBar();
      if (response.isSuccess) {
        setProductsForBar(response.productDocs);
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

  const getNotifications = async () => {
    try {
      const response = await getAllNotifications();
      if (response.isSuccess) {
        setNotifications(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProducts(1, 10);
    isAdmin();
    getUsers();
    getNotifications();
    getProductsForCategoriesBar();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <Dashboard
          productsForBar={productsForBar}
          users={users}
          totalProducts={totalProducts}
          pendingProducts={pendingProducts}
          setActiveTabKey={setActiveTabKey}
        />
      ),
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: (
        <ProductsList
          products={products}
          getProducts={getProducts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ),
      icon: <ProductOutlined />,
    },
    {
      key: "3",
      label: (
        <span className="flex items-center gap-3">
          <PiUsersFourDuotone className="text-lg" />
          Manage Users
        </span>
      ),
      children: <Users users={users} getUsers={getUsers} />,
    },
    {
      key: "4",
      label: (
        <>
          <span>Notification</span>
          <span className="font-medium text-red-500 ps-1">
            {notifications.length}
          </span>
        </>
      ),
      children: <Notification notifications={notifications} />,
      icon: <NotificationFilled />,
    },
    {
      key: "5",
      label: "Profile",
      children: <General />,
      icon: <UserOutlined />,
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
