'use client'

import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Styles from './Calendar.module.css'

export const Calendar = () => {
    const [selected, setSelected] = useState();
    return (
      <div className={Styles["wrapper"]}>
        <DayPicker
          className={Styles.calendar}
          animate
          mode="single"
          selected={selected}
          onSelect={setSelected}
          navLayout="around"
        />
      </div>
  );
}