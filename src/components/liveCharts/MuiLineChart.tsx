import React from "react";
import moment from "moment";
import { LineChart } from "@mui/x-charts/LineChart";
import { SpectrumDatas } from "types/types";

interface LineChartProps {
  colors: string[];
  data: SpectrumDatas[];
  chartType: string;
}

const MuiLineChart: React.FC<LineChartProps> = ({ colors, data, chartType }) => {
  return (
    <LineChart
      colors={colors}
      series={[
        {
          data: data?.map((item) => parseFloat(item[chartType].toFixed(2))).reverse(),
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: data?.map((item) => `${moment(item.time).format("DD-MMM-YY")}\n${moment(item.time).format("HH:mm:ss")}`),
        },
      ]}
      height={200}
    />
  );
};

export default MuiLineChart;
