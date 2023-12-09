import React from "react";
import { Card } from "react-bootstrap";
import MuiLineChart from "components/liveCharts/MuiLineChart";
import { SpectrumDatas } from "types/types";
import { capitalizeFirstLetter } from "utils/functions";

interface ChartCardsProps {
  colors: string[];
  data: SpectrumDatas[];
  chartType: string;
}

const ChartCards: React.FC<ChartCardsProps> = ({ colors, data, chartType }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="">
          {capitalizeFirstLetter(chartType)}: {data.length > 0 ? data[data.length - 1]?.altitude.toFixed(2) + " km" : ""}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <MuiLineChart colors={colors} data={data} chartType="altitude" />
        <div className="text-end m-2 mt-0 mb-0">
          <strong style={{ fontSize: "25px" }}>•</strong> Recent {data.length} values
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartCards;
