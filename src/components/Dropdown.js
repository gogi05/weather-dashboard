import { useState } from "react";
import { ReactComponent as DropdownIcon } from "../assets/down-arrow.svg";

const Dropdown = ({ minWidth = "w-auto", children, onClick, isOpen }) => {
  return (
    <button
      className={`border border-solid border-subtleGrey bg-white px-3 py-2 gap-2 text-black text-xs font-semibold flex justify-between items-center leading-[22px] rounded-md ${minWidth}`}
      onClick={onClick}
    >
      {children}
      <DropdownIcon
        className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
};

export default Dropdown;
