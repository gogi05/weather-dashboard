import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import {
  format,
  differenceInMonths,
  subMonths,
  parseISO,
  addDays,
} from "date-fns";
import { enUS } from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import Dropdown from "../Dropdown";
import Button from "../Button";
import "./style.scss";

const DatePicker = ({ dateRange, onDateRangeSelect }) => {
  const today = new Date();
  const threeMonthsAgo = subMonths(today, 3);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  // Helper function to safely create Date objects
  const createSafeDate = (date) => {
    if (date instanceof Date) return new Date(date);
    if (typeof date === "string") {
      try {
        return parseISO(date);
      } catch (e) {
        console.error("Failed to parse date string:", e);
        return new Date();
      }
    }
    return new Date();
  };

  // Initialize with default dates if none provided
  const getDefaultDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    return { startDate, endDate };
  };

  // Normalize the date range with safety checks
  const normalizedDateRange =
    dateRange?.startDate && dateRange?.endDate
      ? {
          startDate: createSafeDate(dateRange.startDate),
          endDate: createSafeDate(dateRange.endDate),
        }
      : getDefaultDateRange();

  const [selectedRange, setSelectedRange] = useState(normalizedDateRange);

  // Update selected range when dateRange prop changes
  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const newNormalizedRange = {
        startDate: createSafeDate(dateRange.startDate),
        endDate: createSafeDate(dateRange.endDate),
      };
      setSelectedRange(newNormalizedRange);
    }
  }, [dateRange]);

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
  };

  const handleDoneClick = () => {
    const { startDate, endDate } = selectedRange;
    // Ensure the selected range does not exceed 3 months
    if (differenceInMonths(endDate, startDate) <= 3) {
      setDatepickerOpen(false);
      if (onDateRangeSelect) {
        // Create new Date objects to ensure clean dates
        onDateRangeSelect({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
      }
    }
  };

  const formatSafeDate = (date) => {
    try {
      return format(createSafeDate(date), "MMM dd, yyyy");
    } catch (e) {
      console.error("Date formatting error:", e);
      return format(new Date(), "MMM dd, yyyy");
    }
  };

  const selectDropdownText = `${formatSafeDate(
    normalizedDateRange.startDate
  )} - ${formatSafeDate(normalizedDateRange.endDate)}`;

  const onDropdownClick = () => {
    setDatepickerOpen((prev) => !prev);
  };

  return (
    <div className="datepicker-wrapper relative inline-flex">
      <Dropdown
        minWidth="min-w-[220px]"
        isOpen={datepickerOpen}
        onClick={onDropdownClick}
      >
        {selectDropdownText}
      </Dropdown>
      {datepickerOpen && (
        <div className="absolute left-0 mt-11 bg-white shadow-dropdown rounded-lg z-50 border border-lightSilver overflow-hidden">
          <DateRange
            ranges={[{ ...selectedRange, key: "selection" }]}
            rangeColors={["#ECF5F6"]}
            onChange={handleSelect}
            minDate={threeMonthsAgo}
            maxDate={today}
            months={2}
            direction="horizontal"
            locale={enUS}
            showMonthAndYearPickers={false}
          />
          <div className="flex justify-end px-4 py-3 border-t border-lightSilver">
            <Button onClick={handleDoneClick}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
