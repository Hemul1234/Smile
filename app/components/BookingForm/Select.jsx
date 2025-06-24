"use client"

import { useState, useRef, useEffect } from 'react';
import Styles from './Select.module.css';

export function Select({
  options = [],      // [{id, name}], [{id, text}], [{id, title}], ...
  onSelect,
  blocked = [],      // массив строк
  placeholder = "Выберите вариант"
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Здесь мы берём имя для отображения из name, text или title
  const getDisplayName = (option) =>
    option.name || option.text || option.title || "";
  const handleSelect = (option) => {
    const displayName = getDisplayName(option);
    if (blocked.includes(displayName)) return;
    setSelected(displayName);
    setOpen(false);
    onSelect?.(option);
  };

  return (
    <div className={Styles.wrapper} ref={ref}>
      <button onClick={() => setOpen(!open)} className={Styles.input} type="button">
        <p className={`${Styles.placeholder} ${!selected ? Styles.opacity : ''}`}>{selected || placeholder}</p>
        <img className={Styles["accordion-icon"]} src="/images/icons/accordSignUp.svg" alt="icon"/>
      </button>

      {open && (
        <div className={Styles.popover}>
          {options.length === 0 && (
            <div className={Styles.empty}>Нет доступных вариантов</div>
          )}
          {options.map((option, idx) => {
            const displayName = getDisplayName(option);
            const isBlocked = blocked.includes(displayName);
            return (
              <div
                key={option.id || idx}
                className={`${Styles.option} ${isBlocked ? Styles.disabled : ''}`}
                onClick={() => handleSelect(option)}
              >
                {displayName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}