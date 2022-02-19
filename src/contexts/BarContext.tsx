import { createContext, useContext, useState } from "react";

const BarContext = createContext<[number[], (bars: number[]) => void]>(
  undefined as any
);

const readBarSettings = () => {
  try {
    const settings = localStorage.getItem("__bars");
    if (!settings) {
      throw null;
    }
    const parsedSettings = JSON.parse(settings);
    if (
      !Array.isArray(parsedSettings) ||
      parsedSettings.length === 0 ||
      parsedSettings.some(
        (item) => typeof item !== "number" || item <= 0 || item > 100
      )
    ) {
      throw null;
    }
    return parsedSettings;
  } catch {
    return [10, 12, 20];
  }
};

export const BarProvider: React.FC = ({ children }) => {
  const [barbells, setBarbells] = useState<number[]>(readBarSettings());
  const persistBarbells = (list: number[]) => {
    localStorage.setItem("__bars", JSON.stringify(list));
    setBarbells(list.sort((a, b) => a - b));
  };

  return (
    <BarContext.Provider value={[barbells, persistBarbells]}>
      {children}
    </BarContext.Provider>
  );
};

export const useBar = () => {
  return useContext(BarContext);
};
