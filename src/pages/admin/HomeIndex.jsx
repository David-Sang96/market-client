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
import { getAllProducts, getAllUsers } from "../../apicalls/admin";
import Dashboard from "./Dashboard";
import General from "./General";
import ProductsList from "./ProductsList";
import Users from "./Users";

const Home = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

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
    getUsers();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: <Dashboard products={products} users={users} />,
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: <ProductsList products={products} getProducts={getProducts} />,
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
      label: "Notification",
      children: "Content of Tab Pane 2",
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
