import AlbumIcon from "@mui/icons-material/Album";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useToggle } from "../utils/hooks";
import { BarEditor } from "./BarEditor";

export const SettingsMenu = () => {
  const [barEditorVisible, toggleBarEditor] = useToggle(false);
  return (
    <>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Edit bars"
            icon={<FitnessCenterIcon />}
            onClick={toggleBarEditor}
          />
          <BottomNavigationAction label="Edit weights" icon={<AlbumIcon />} />
        </BottomNavigation>
      </Paper>
      <BarEditor visible={barEditorVisible} toggle={toggleBarEditor} />
    </>
  );
};
