import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import DropdownMenu from "./dropdownMenu";
import { LOCATIONS_LIST } from "../../constants";

const CountryDropdown = ({ countryFilter, setCountryFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState(countryFilter);

  const handleDropDownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setTempSelection(countryFilter);
  }, [countryFilter]);

  const handleDone = () => {
    setCountryFilter(tempSelection);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <Dropdown
        minWidth="min-w-[184px]"
        isOpen={isDropdownOpen}
        onClick={handleDropDownClick}
      >
        {tempSelection}
      </Dropdown>
      {isDropdownOpen && (
        <DropdownMenu
          tempSelection={tempSelection}
          setTempSelection={setTempSelection}
          onDone={handleDone}
          locations={LOCATIONS_LIST} // Pass LOCATIONS_LIST to DropdownMenu
        />
      )}
    </div>
  );
};

export default CountryDropdown;
