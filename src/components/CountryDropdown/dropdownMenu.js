import Button from "../Button";

const DropdownMenu = ({
  tempSelection,
  setTempSelection,
  onDone = () => {},
  locations = [],
}) => {
  const handleSelection = (country) => {
    setTempSelection(country);
  };

  const handleSelectAll = () => {
    setTempSelection("All Countries Selected");
  };

  const handleDone = () => {
    onDone();
  };

  // Base radio styles with pseudo-element for inner circle
  const radioStyles = `
    w-5 h-5 
    rounded-full 
    border-2 
    relative 
    appearance-none 
    cursor-pointer
    after:content-['']
    after:absolute
    after:w-3
    after:h-3
    after:rounded-full
    after:top-1/2
    after:left-1/2
    after:-translate-x-1/2
    after:-translate-y-1/2
    after:transition-all
  `;

  return (
    <div className="absolute left-0 mt-1 shadow-dropdown w-60 rounded-lg bg-white z-10">
      {/* "Select All Countries" option */}
      <div
        className={`flex h-10 items-center justify-between gap-4 px-4 cursor-pointer ${
          tempSelection === "All Countries Selected"
            ? "bg-lightGrey text-vibrantBlue"
            : ""
        }`}
        onClick={handleSelectAll}
      >
        <div className="text-sm">Select All Countries</div>
        <input
          type="radio"
          className={`${radioStyles} ${
            tempSelection === "All Countries Selected"
              ? "border-vibrantBlue after:bg-vibrantBlue"
              : "border-phillipineGrey after:bg-transparent"
          }`}
          checked={tempSelection === "All Countries Selected"}
          readOnly
        />
      </div>

      {/* Country List from locations */}
      {locations.map((country) => (
        <div
          key={country.id}
          className={`flex h-10 items-center justify-between gap-4 px-4 cursor-pointer ${
            tempSelection === country.name
              ? "bg-lightGrey text-vibrantBlue"
              : ""
          }`}
          onClick={() => handleSelection(country.name)}
        >
          <div className="text-sm">{country.name}</div>
          <input
            type="radio"
            className={`${radioStyles} ${
              tempSelection === country.name
                ? "border-vibrantBlue after:bg-vibrantBlue"
                : "border-phillipineGrey after:bg-transparent"
            }`}
            checked={tempSelection === country.name}
            readOnly
          />
        </div>
      ))}

      {/* Done button */}
      <div className="flex justify-end px-4 py-3 border-t border-lightSilver">
        <Button onClick={handleDone}>Done</Button>
      </div>
    </div>
  );
};

export default DropdownMenu;
