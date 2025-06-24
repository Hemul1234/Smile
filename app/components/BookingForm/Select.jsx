"use client"

import { useState, useRef, useEffect } from 'react';
import Styles from './Select.module.css';

export function Select({
  options = [],      // [{id, name}], [{id, text}], [{id, title}], ...
  onSelect,
  selected,          // контролируемое значение
  blocked = [],      // массив строк
  placeholder = "Выберите вариант"
}) {
  options = Array.isArray(options) ? options : [];
  const [open, setOpen] = useState(false);
  // внутренний state нужен только если selected не передан
  const [internalSelected, setInternalSelected] = useState('');
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

  // определяем отображаемое имя
  const getDisplayName = (option) =>
    option?.name || option?.text || option?.title || "";

  const handleSelect = (option) => {
    const displayName = getDisplayName(option);
    if (blocked.includes(displayName)) return;
    setOpen(false);
    if (onSelect) onSelect(option);
    if (selected === undefined) setInternalSelected(option);
  };

  // Показываем выбранное значение: controlled или uncontrolled
  const chosen = selected !== undefined ? selected : internalSelected;

  return (
    <div className={Styles.wrapper} ref={ref}>
      <button onClick={() => setOpen(!open)} className={Styles.input} type="button">
        <p className={`${Styles.placeholder} ${!chosen ? Styles.opacity : ''}`}>
          {chosen ? getDisplayName(chosen) : placeholder}
        </p>
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
                className={`${Styles.option} ${isBlocked ? Styles.disabled : ''} ${getDisplayName(chosen) === displayName ? Styles.selected : ''}`}
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