import { useState, useCallback } from "react";

/**
 * Универсальный хук для управления активным элементом.
 * @param {any} initialValue — активный элемент по умолчанию
 * @param {boolean} allowReset — разрешить сброс при повторном клике
 */

export const useToggleActive = (initialValue = null, allowReset = true) => {
    const [active, setActive] = useState(initialValue);
    const toggleActive = useCallback((value) => {
        setActive((prev) => {
            if(allowReset && prev === value) {
                return null;
            }
            return value;
        });
    }, [allowReset]);
    return {active, toggleActive};
};