import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useToggle } from "../utils/hooks";
import { BarbellEditor } from "./Barbell/BarbellEditor";
import { FitnessCenterIcon, AlbumIcon } from "./Icons";
import { PlateEditor } from "./Plate/PlateEditor";

export const SettingsMenu = () => {
  const [barEditorVisible, toggleBarEditor] = useToggle(false);
  const [plateEditorVisible, togglePlateEditor] = useToggle(false);
  return (
    <>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Edit bars"
            icon={<FitnessCenterIcon />}
            onClick={toggleBarEditor}
          />
          <BottomNavigationAction
            label="Edit weights"
            icon={<AlbumIcon />}
            onClick={togglePlateEditor}
          />
        </BottomNavigation>
      </Paper>
      <BarbellEditor visible={barEditorVisible} toggle={toggleBarEditor} />
      <PlateEditor visible={plateEditorVisible} toggle={togglePlateEditor} />
    </>
  );
};
