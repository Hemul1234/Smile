"use client"

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Styles from './Calendar.module.css'

export const Calendar = ({ onSelect, selected }) => {
  // controlled: если selected передан — используем его, иначе внутренний state
  const [internalSelected, setInternalSelected] = useState();

  useEffect(() => {
    if (selected !== undefined) setInternalSelected(selected);
  }, [selected]);

  const handleSelect = (date) => {
    if (onSelect) onSelect(date);
    if (selected === undefined) setInternalSelected(date);
  };

  const chosen = selected !== undefined ? selected : internalSelected;

  return (
    <div className={Styles["wrapper"]}>
      <DayPicker
        className={Styles.calendar}
        animate
        mode="single"
        selected={chosen}
        onSelect={handleSelect}
        navLayout="around"
      />
    </div>
  );
}