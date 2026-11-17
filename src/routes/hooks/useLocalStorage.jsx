import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value !== null && value !== 'undefined') {
        return JSON.parse(value);
      }
      if (defaultValue !== undefined && defaultValue !== null) {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      }
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      if (newValue === null || newValue === undefined) {
        window.localStorage.removeItem(keyName);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      }
    } catch (err) {
      // ignore write error
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
