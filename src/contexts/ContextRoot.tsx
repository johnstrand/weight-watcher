import { BarProvider } from "./BarContext";
import { PlateProvider } from "./PlateContext";

export const ContextRoot: React.FC = ({ children }) => {
  return (
    <BarProvider>
      <PlateProvider>{children}</PlateProvider>
    </BarProvider>
  );
};
