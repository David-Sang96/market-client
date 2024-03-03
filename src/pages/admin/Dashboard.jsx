/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { RiShoppingCartLine } from "react-icons/ri";
import AreaChartHero from "../../components/Dashboard/AreaChart";
import Bar from "../../components/Dashboard/Bar";
import DashBoardCard from "../../components/Dashboard/Card";

const Dashboard = ({ products, users }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const calcTotalSales = () => {
    const totalAmount = products.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  };

  useEffect(() => {
    if (products.length) {
      calcTotalSales();
      setProductCount(products.length);
      setUserCount(users.length);
    }
  }, [products]);

  return (
    <section>
      <div className="flex items-center gap-6 mt-2 ">
        <DashBoardCard
          title={"Total Sales"}
          count={`RM ${totalSales}`}
          icon={LiaMoneyBillWaveSolid}
          text={"RM"}
        />
        <DashBoardCard
          title={"Active Users"}
          count={userCount}
          icon={FaUsers}
          text={"User"}
        />
        <DashBoardCard
          title={"Total Products"}
          count={productCount}
          icon={RiShoppingCartLine}
          text={"Items"}
        />
      </div>
      <AreaChartHero products={products} />
      <Bar products={products} />
    </section>
  );
};

export default Dashboard;
