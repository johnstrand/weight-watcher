import React from "react";

export const sortNumbers = (a: number, b: number) => a - b;
export const sortNumbersInverse = (a: number, b: number) => b - a;

export const readStorage = <T>(
  key: string,
  validator: (value: any) => boolean,
  defaultValue: T
) => {
  try {
    const settings = localStorage.getItem(key);
    if (!settings) {
      throw null;
    }
    const parsedSettings = JSON.parse(settings);

    if (!validator(parsedSettings)) {
      throw null;
    }
    return parsedSettings;
  } catch {
    return defaultValue;
  }
};

export const writeStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const validateNumericArray = (
  maybeArray: any,
  valueValidator: (n: number) => boolean
) => {
  return (
    Array.isArray(maybeArray) &&
    maybeArray.length > 0 &&
    maybeArray.every((item) => typeof item === "number" && valueValidator(item))
  );
};

export const onEnter = (callback: () => void) => {
  return (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() !== "enter") {
      return;
    }

    callback();
  };
};

export const hasDiff = <T>(a1: T[], a2: T[]) => {
  return a1.length !== a2.length || a1.some((a, index) => a !== a2[index]);
};

export const tryValidateNo = (nr: string, allowDecimal = false) => {
  if (!nr) {
    return [false, 0] as const;
  }

  const n = allowDecimal ? parseFloat(nr) : parseInt(nr, 10);
  const validNo = !isNaN(n);

  return [validNo, validNo ? Math.max(n, 0) : 0] as const;
};

export const removeNo = (values: number[], valueToRemove: number) => {
  return values.filter((v) => v !== valueToRemove);
};
