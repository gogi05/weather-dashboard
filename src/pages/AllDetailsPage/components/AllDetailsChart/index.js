import { useState, useEffect } from "react";
import Card from "../../../../components/Card";
import ChartDropdown from "./components/ChartDropdown";
import DetailsChart from "./components/DetailsChart";
import { CHART_DROPDOWN_TYPES } from "./constants";

const AllDetailsChart = ({ data, chartType = "", units }) => {
  // State to store selected items
  const [selectedItems, setSelectedItems] = useState([chartType]);

  // Generate the heading based on selected items
  const chartHeading = selectedItems
    .map((item) => CHART_DROPDOWN_TYPES[item]?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-lg font-semibold">{chartHeading}</div>
        <ChartDropdown
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>

      {/* Details Chart */}
      <DetailsChart chartData={data} selectedItems={selectedItems} />
    </Card>
  );
};

export default AllDetailsChart;
