/* eslint-disable react/prop-types */
import { Badge, Card, Metric, Text } from "@tremor/react";

const DashBoardCard = ({ title, count, icon, text }) => {
  return (
    <Card className="mb-5 ">
      <div className="flex items-center justify-between">
        <Text>{title}</Text>
        <Badge size="sm" icon={icon}>
          {text}
        </Badge>
      </div>
      <Metric>{count}</Metric>
    </Card>
  );
};

export default DashBoardCard;
