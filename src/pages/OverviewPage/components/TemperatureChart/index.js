import React, { useMemo } from "react";
import CommonChartCardLayout from "../../../../components/CommonChartCardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CHART_HEADING } from "../../../../constants";
import { format } from "date-fns"; // Import date-fns for date formatting
import { processChartData, getXAxisTicks } from "./helpers";

const TemperatureChart = ({ data }) => {
  // Memoized the processed data to avoid recalculating on every render
  const chartData = useMemo(() => processChartData(data), [data]);

  // Memoized the X-axis ticks to avoid recalculating on every render
  const xAxisTicks = useMemo(() => getXAxisTicks(chartData), [chartData]);

  return (
    <CommonChartCardLayout
      icon={CHART_HEADING.TEMPERATURE.icon}
      text={CHART_HEADING.TEMPERATURE.text}
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
              ticks={xAxisTicks}
              tickFormatter={(tick) => format(new Date(tick), "MMM d")}
              style={{ fontSize: "10px" }}
              axisLine={false}
              tickCount={xAxisTicks.length} // to ensure that the ticks are evenly spaced
            />
            <YAxis style={{ fontSize: "10px" }} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#007c9e"
              name="Max Temp"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="minTemp"
              stroke="#8bada9"
              name="Min Temp"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="avgTemp"
              stroke="rgba(238, 201, 32, 1)"
              name="Avg Temp"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

export default TemperatureChart;
