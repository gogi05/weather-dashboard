import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import CommonChartCardLayout from "../../../../components/CommonChartCardLayout";
import { CHART_HEADING } from "../../../../constants";
import usePrecipitationData from "./usePrecipitationData";

const PrecipitationChart = ({ data }) => {
  // Use the custom hook to get processed data
  const chartData = usePrecipitationData(data);

  // Calculate the number of ticks you want to show (at most 10)
  const totalDataPoints = chartData.length;
  const xAxisTicks = totalDataPoints <= 10 ? totalDataPoints : 10;

  // Calculate tick positions as evenly distributed across the data
  const tickIndices = Array.from({ length: xAxisTicks }, (_, index) =>
    Math.floor((index * totalDataPoints) / xAxisTicks)
  );

  // Dynamically calculate the barSize based on the number of data points
  const barSize = totalDataPoints < 10 ? 20 : 10; // Adjust these values as needed

  return (
    <CommonChartCardLayout
      icon={CHART_HEADING.PRECIPITATION.icon}
      text={CHART_HEADING.PRECIPITATION.text}
      content={
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              horizontal={true}
            />
            <XAxis
              dataKey="date"
              ticks={tickIndices.map((index) => chartData[index].date)}
              tickFormatter={(tick) => format(new Date(tick), "MMM d")}
              style={{ fontSize: "10px" }}
              axisLine={false}
              tickCount={xAxisTicks}
            />
            <YAxis style={{ fontSize: "10px" }} axisLine={false} />
            <Tooltip />
            <Bar
              dataKey="precipitation"
              fill="rgba(0, 124, 158, 1)"
              name="Precipitation (mm)"
              barSize={barSize} // Use dynamic barSize
            />
          </BarChart>
        </ResponsiveContainer>
      }
    />
  );
};

export default PrecipitationChart;
