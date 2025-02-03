import { useState, useEffect } from "react";
import Card from "../../../../components/Card";
import ChartDropdown from "./components/ChartDropdown";
import DetailsChart from "./components/DetailsChart";
import { CHART_DROPDOWN_TYPES } from "./constants";

const AllDetailsChart = ({ data, chartType = "" }) => {
  // State to store selected items
  const [selectedItems, setSelectedItems] = useState([chartType]);

  // Log selected items when they change
  useEffect(() => {
    console.log("Selected Items:", selectedItems);
  }, [selectedItems]);

  console.log("Data to be forwarded to charts: ", data, chartType);

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
