"use client"

import { useState, useRef, useEffect } from 'react';
import Styles from './TimeSelect.module.css';

function generateTimeSlots(start = '09:00', end = '18:00', interval = 30) {
  const slots = [];
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);

  let current = new Date();
  current.setHours(startH, startM, 0, 0);
  const endTime = new Date();
  endTime.setHours(endH, endM, 0, 0);

  while (current <= endTime) {
    const h = String(current.getHours()).padStart(2, '0');
    const m = String(current.getMinutes()).padStart(2, '0');
    slots.push(`${h}:${m}`);
    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
}

export function TimeSelect({
  blocked = [], // массив строк ['10:00', '12:30']
  start = '09:00',
  end = '18:00',
  interval = 30,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const ref = useRef(null);
  const timeSlots = generateTimeSlots(start, end, interval);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (time) => {
    if (blocked.includes(time)) return;
    setSelected(time);
    setOpen(false);
    onSelect?.(time);
  };

  return (
    <div className={Styles.wrapper} ref={ref}>
      <button onClick={() => setOpen(!open)} className={Styles.input}>
        <p className={`${Styles.placeholder} ${!selected ? Styles.opacity : ''}`}>{selected || '12:13'}</p>
        <img className={Styles["accordion-icon"]} src="/images/icons/accordSignUp.svg" alt="icon"></img>
      </button>

      {open && (
        <div className={Styles.popover}>
          {timeSlots.map((time) => {
            const isBlocked = blocked.includes(time);
            return (
              <div
                key={time}
                className={`${Styles.option} ${isBlocked ? Styles.disabled : ''}`}
                onClick={() => handleSelect(time)}
              >
                {time}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
