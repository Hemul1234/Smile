'use client';

import { useState, useMemo } from "react";
import { getDataByTypeAndCategory } from "@/app/data/dataUtils";
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

export default function DoctorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Ортодонты");

  const doctorsData = useMemo(() => {
    const category = categoryMap[selectedCategory];
    return getDataByTypeAndCategory("doctors", category);
  }, [selectedCategory]);

  return (
    <>
      <DoctorsSwitch active={selectedCategory} onChange={setSelectedCategory} />
      <CardList variant="doctors" data={doctorsData} />
    </>
  );
}
