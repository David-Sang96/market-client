/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { RiShoppingCartLine } from "react-icons/ri";
import AreaChartHero from "../../components/Dashboard/AreaChart";
import Bar from "../../components/Dashboard/Bar";
import DashBoardCard from "../../components/Dashboard/Card";

const Dashboard = ({
  productsForBar,
  users,
  totalProducts,
  pendingProducts,
  setActiveTabKey,
}) => {
  const [totalSales, setTotalSales] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const calcTotalSales = () => {
    const totalAmount = productsForBar.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  };

  useEffect(() => {
    if (productsForBar.length) {
      calcTotalSales();
      setUserCount(users.length);
    }
  }, [productsForBar]);

  return (
    <section>
      <div className="flex items-center gap-6 mt-2 ">
        <div className="w-full">
          <DashBoardCard
            title={"Total Sales"}
            count={`RM ${totalSales}`}
            icon={LiaMoneyBillWaveSolid}
            text={"RM"}
          />
        </div>
        <div
          className="w-full cursor-pointer"
          onClick={() => setActiveTabKey("3")}
        >
          <DashBoardCard
            title={"Active Users"}
            count={userCount}
            icon={FaUsers}
            text={"User"}
          />
        </div>
        <div
          className="w-full cursor-pointer"
          onClick={() => setActiveTabKey("2")}
        >
          <DashBoardCard
            title={"Total Products"}
            count={totalProducts}
            icon={RiShoppingCartLine}
            text={"Items"}
          />
        </div>
        <div
          className="w-full cursor-pointer"
          onClick={() => setActiveTabKey("2")}
        >
          <DashBoardCard
            title={"Pending Products"}
            count={pendingProducts.length}
            icon={RiShoppingCartLine}
            text={"Items"}
          />
        </div>
      </div>
      <AreaChartHero productsForBar={productsForBar} />
      <Bar productsForBar={productsForBar} />
    </section>
  );
};

export default Dashboard;
