import React from "react";
import { Card } from "react-bootstrap";
import MuiLineChart from "components/liveCharts/LineChart";
import { SpectrumDatas } from "types/types";

interface ChartCardsProps {
  colors: string[];
  data: SpectrumDatas[];
  chartType: string;
}

const ChartCards: React.FC<ChartCardsProps> = ({ colors, data, chartType }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="">Altitude: {data.length > 0 ? data[data.length - 1]?.altitude.toFixed(2) + " km" : ""}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <MuiLineChart colors={["#8884d8"]} data={data} chartType="altitude" />
        <div className="text-end m-2 mt-0 mb-0">
          <strong style={{ fontSize: "25px" }}>•</strong> Recent 5 values
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartCards;
