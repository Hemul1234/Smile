'use client';

import { useState, useMemo } from "react";
import { getDataByTypeAndCategory } from "@/app/data/dataUtils";
import { filterDoctorsByCategory } from "@/app/data/dataUtils";
import { CardList } from "../CardList/CardList";
import { DoctorsSwitch } from "./DoctorsSwitch";

const categoryMap = {
  "Ортодонты": "orthodontist",
  "Гигиенисты": "hygienist",
  "Терапевты": "therapist",
  "Ортопеды": "orthopedist",
  "Хирурги": "surgeon",
  "Микроскописты": "microscopist"
};

export default function DoctorsPage({data}) {
  const [selectedCategory, setSelectedCategory] = useState("Ортодонты");

  const doctorsData = useMemo(() => {
  const category = categoryMap[selectedCategory];
  const safeData = Array.isArray(data) ? data : [];
  return filterDoctorsByCategory(safeData, category);
}, [selectedCategory, data]);


  return (
    <>
      <DoctorsSwitch active={selectedCategory} onChange={setSelectedCategory} />
      <CardList variant="doctors" data={doctorsData} />
    </>
  );
}
