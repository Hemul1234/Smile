"use client"

import { getDataByTypeAndCategory } from '@/app/data/dataUtils';
import { useState, useRef, useEffect } from 'react';
import Styles from './DoctorsSelect.module.css';

function generateDoctorSlots({category}) {
  const slots = [];
  const doctors = getDataByTypeAndCategory("doctors", `${category}`)
  doctors.map((item) => (
    slots.push(item)
  ));

  return slots;
}

export function DoctorsSelect({
  category,
  onSelect,
  blocked = [], // массив строк
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const ref = useRef(null);
  const DoctorSlots = generateDoctorSlots({category});

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (doctor) => {
    if (blocked.includes(doctor.name)) return;
    setSelected(doctor.name);
    setOpen(false);
    onSelect?.(doctor.name);
  };

  return (
    <div className={Styles.wrapper} ref={ref}>
      <button onClick={() => setOpen(!open)} className={Styles.input}>
        <p className={`${Styles.placeholder} ${!selected ? Styles.opacity : ''}`}>{selected || 'Иван Иванов Иванович'}</p>
        <img className={Styles["accordion-icon"]} src="/images/icons/accordSignUp.svg" alt="icon"></img>
      </button>

      {open && (
        <div className={Styles.popover}>
          {DoctorSlots.length === 0 && (
            <div className={Styles.empty}>Нет доступных врачей</div>
          )}
          {DoctorSlots.map((doctor) => {
            const isBlocked = blocked.includes(doctor.name);
            return (
              <div
                key={doctor.id}
                className={`${Styles.option} ${isBlocked ? Styles.disabled : ''}`}
                onClick={() => handleSelect(doctor)}
              >
                {doctor.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
