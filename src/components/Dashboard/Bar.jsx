/* eslint-disable react/prop-types */
import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

const Bar = ({ productsForBar }) => {
  const categories = {};
  productsForBar.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = 0;
    }
    categories[product.category]++;
  });

  const data = Object.entries(categories).map(([key, value]) => ({
    name: key.replaceAll("_", " "),
    value,
  }));

  return (
    <Card className="w-full my-6">
      <Title>Product Count By Categories</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Category</Bold>
        </Text>
        <Text>
          <Bold>Counts</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default Bar;
