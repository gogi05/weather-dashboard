import { useState } from "react";
import Button from "../../../../../../components/Button";
import { CHART_DROPDOWN_TYPES } from "../../constants";

const ChartDropdownMenu = ({
  selectedItems,
  setSelectedItems,
  onDone = () => {},
}) => {
  // Local state to temporarily store selected items
  const [tempSelectedItems, setTempSelectedItems] = useState(selectedItems);

  const handleSelection = (key) => {
    // Check if we already have two selected items, prevent further selection if so
    if (tempSelectedItems.length >= 2 && !tempSelectedItems.includes(key)) {
      return; // Stop the selection if more than two items are already selected
    }

    // Update the local temporary selected items
    setTempSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(key)) {
        // Remove from selected items if already selected
        return prevSelectedItems.filter((item) => item !== key);
      } else {
        // Add to selected items
        return [...prevSelectedItems, key];
      }
    });
  };

  const handleDone = () => {
    // When Done is clicked, update the parent state with the final selection
    setSelectedItems(tempSelectedItems);
    if (onDone) onDone();
  };

  return (
    <div className="absolute left-0 mt-1 shadow-dropdown w-60 rounded-lg bg-white z-10">
      {/* Mapping through CHART_DROPDOWN_TYPES to create options */}
      {Object.entries(CHART_DROPDOWN_TYPES).map(([key, { name }]) => (
        <div
          key={key}
          className={`flex h-10 items-center justify-between gap-4 px-4 cursor-pointer ${
            tempSelectedItems.includes(key)
              ? "bg-lightGrey text-vibrantBlue"
              : ""
          }`}
          onClick={() => handleSelection(key)}
        >
          <div className="text-sm">{name}</div>
          <input
            type="checkbox"
            className={`w-5 h-5 rounded-sm border-2 cursor-pointer ${
              tempSelectedItems.includes(key)
                ? "border-vibrantBlue bg-vibrantBlue"
                : "border-phillipineGrey bg-transparent"
            } ${
              tempSelectedItems.length >= 2 && !tempSelectedItems.includes(key)
                ? "cursor-not-allowed"
                : ""
            }`}
            checked={tempSelectedItems.includes(key)}
            readOnly
          />
        </div>
      ))}

      <div className="flex justify-end px-4 py-3 border-t border-lightSilver">
        <Button onClick={handleDone}>Done</Button>
      </div>
    </div>
  );
};

export default ChartDropdownMenu;
