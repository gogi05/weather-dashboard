import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import processWindSpeedData from "./processWindSpeedData"; // Import the utility function
import { CHART_HEADING } from "../../../../constants";
import CommonChartCardLayout from "../../../../components/CommonChartCardLayout";

// Component to display the wind speed chart
const WindSpeedChart = ({ data }) => {
  // Process the data to get chart data
  const chartData = processWindSpeedData(data);

  // Calculate the number of ticks you want to show (at most 10)
  const totalDataPoints = chartData.length;
  const xAxisTicks = totalDataPoints <= 10 ? totalDataPoints : 10;

  // Calculate tick positions as evenly distributed across the data
  const tickIndices = Array.from({ length: xAxisTicks }, (_, index) =>
    Math.floor((index * totalDataPoints) / xAxisTicks)
  );

  return (
    <CommonChartCardLayout
      icon={CHART_HEADING.WIND_SPEED.icon}
      text={CHART_HEADING.WIND_SPEED.text}
      content={
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#007c9e"
              name="Wind Speed"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

export default WindSpeedChart;
