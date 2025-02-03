import { useState } from "react";
import ChartDropdownMenu from "./ChartDropdownMenu";
import Dropdown from "../../../../../../components/Dropdown";

const ChartDropdown = ({ selectedItems, setSelectedItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <Dropdown
        minWidth="min-w-[200px]"
        isOpen={isDropdownOpen}
        onClick={toggleDropdown}
      >
        Select Charts here
      </Dropdown>

      {isDropdownOpen && (
        <ChartDropdownMenu
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          onDone={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ChartDropdown;
