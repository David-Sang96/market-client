/* eslint-disable react/prop-types */
import { AreaChart, Card, Title } from "@tremor/react";
import { format } from "date-fns";

const AreaChartHero = ({ productsForBar }) => {
  // get  date of  a week ago
  const currentDate = new Date();
  const dateOfOneWeekAgo = new Date().setDate(currentDate.getDate() - 7);

  const DailyProductSellRate = {};

  //calc products of a week
  productsForBar.forEach((product) => {
    const productSellDate = new Date(product.createdAt);
    const formattedDate = format(new Date(productSellDate), "MMM/dd");
    if (productSellDate <= currentDate && productSellDate > dateOfOneWeekAgo) {
      //DailyProductSellRate.formattedDate
      if (!DailyProductSellRate[formattedDate]) {
        DailyProductSellRate[formattedDate] = 0;
      }
      DailyProductSellRate[formattedDate] += 1;
    }
  });

  /*const chartdata = Object.keys(DailyProductSellRate).map((date) => ({
    date,
    "Product sell rate": DailyProductSellRate[date],
  }));*/

  //Object.entries turn into array
  const chartdata = Object.entries(DailyProductSellRate).map(
    ([key, value]) => ({
      //array destructure [key, value]
      date: key,
      "Product sell rate": value,
    })
  );

  return (
    <Card>
      <Title>Daily Product Sell Rates </Title>
      <AreaChart
        className=" h-80"
        data={chartdata}
        index="date"
        categories={["Product sell rate"]}
        colors={["blue"]}
        yAxisWidth={50}
      />
    </Card>
  );
};

export default AreaChartHero;
