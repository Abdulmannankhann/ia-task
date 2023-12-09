import React from "react";
import { Card } from "react-bootstrap";
import MuiLineChart from "components/liveCharts/MuiLineChart";
import { SpectrumDatas } from "types/types";
import { capitalizeFirstLetter } from "utils/functions";

interface ChartCardsProps {
  colors: string[];
  data: SpectrumDatas[];
  chartType: string;
  unit: string;
}

const ChartCards: React.FC<ChartCardsProps> = ({ colors, data, chartType, unit }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="">
          {capitalizeFirstLetter(chartType)}: {data.length > 0 ? (Number(data[0]?.[chartType]) || 0).toFixed(2) + ` ${unit}` : ""}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <MuiLineChart colors={colors} data={data} chartType={`${chartType}`} />
        <div className="text-end m-2 mt-0 mb-0">
          <strong style={{ fontSize: "25px" }}>•</strong> Recent {data.length} values
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartCards;
