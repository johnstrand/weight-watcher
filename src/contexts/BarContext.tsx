import { createContext, useContext, useState } from "react";
import {
  readStorage,
  sortNumbers,
  validateNumericArray,
  writeStorage,
} from "../utils/helpers";

const BarContext = createContext<[number[], (bars: number[]) => void]>(
  undefined as any
);

export const validBarbellWeight = (w: number) => {
  return w > 0 && w <= 100;
};

const defaultBarBells = [10, 12, 20];

const validateBarbells = (barbells: any) => {
  return validateNumericArray(barbells, validBarbellWeight);
};

const readBarbellSettings = () => {
  return readStorage("__barbells", validateBarbells, defaultBarBells);
};

export const BarProvider: React.FC = ({ children }) => {
  const [barbells, setBarbells] = useState<number[]>(readBarbellSettings());
  const persistBarbells = (list: number[]) => {
    setBarbells(
      writeStorage(
        "__barbells",
        list.filter(validBarbellWeight).sort(sortNumbers)
      )
    );
  };

  return (
    <BarContext.Provider value={[barbells, persistBarbells]}>
      {children}
    </BarContext.Provider>
  );
};

export const useBarbells = () => {
  return useContext(BarContext);
};
