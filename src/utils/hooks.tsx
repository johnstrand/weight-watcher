import { useState } from "react";

export const useToggle = (value: boolean = false) => {
  const [state, setState] = useState(value);

  return [state, () => setState((current) => !current)] as const;
};
