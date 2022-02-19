import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBar } from "../contexts/BarContext";

type Props = {
  visible: boolean;
  toggle: () => void;
};

export const BarEditor = (props: Props) => {
  const { visible, toggle } = props;
  const [bars, setBars] = useBar();

  const saveChanges = () => {
    toggle();
  };

  return (
    <>
      <Dialog open={visible} fullScreen scroll="paper">
        <DialogTitle>
          Edit available bars
          <IconButton
            aria-label="close"
            onClick={toggle}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {bars.map((bar) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="warning">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText>{`${bar} kg`}</ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="info" onClick={saveChanges}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
