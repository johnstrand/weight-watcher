import { createContext, useContext, useState } from "react";
import {
  readStorage,
  sortNumbersInverse,
  validateNumericArray,
  writeStorage,
} from "../utils/helpers";

const PlateContext = createContext<[number[], (plates: number[]) => void]>(
  undefined as any
);

export const validPlateWeight = (w: number) => {
  return w > 0 && w <= 100;
};

const defaultPlates = [20, 15, 10, 5, 2.5, 1.25];

const validatePlates = (plates: any) => {
  return validateNumericArray(plates, validPlateWeight);
};

const readPlateSettings = () => {
  return readStorage("__plates", validatePlates, defaultPlates);
};

export const PlateProvider: React.FC = ({ children }) => {
  const [plates, setPlates] = useState<number[]>(readPlateSettings());
  const persistPlates = (list: number[]) => {
    setPlates(
      writeStorage(
        "__plates",
        list.filter(validPlateWeight).sort(sortNumbersInverse)
      )
    );
  };

  return (
    <PlateContext.Provider value={[plates, persistPlates]}>
      {children}
    </PlateContext.Provider>
  );
};

export const usePlates = () => {
  return useContext(PlateContext);
};
