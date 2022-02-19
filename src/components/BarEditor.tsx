import {
  Badge,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useBar } from "../contexts/BarContext";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  toggle: () => void;
};

const validate = (nr: string) => {
  if (!nr) {
    return [false, 0] as const;
  }

  const n = parseInt(nr, 10);
  const validNo = !isNaN(n);

  return [validNo, validNo ? Math.max(n, 0) : 0] as const;
};

export const BarEditor = (props: Props) => {
  const { visible, toggle } = props;
  const [bars, setBars] = useBar();
  const [dirtyBarBells, setDirtyBarbells] = useState<number[]>([]);
  const [newBarbell, setNewBarbell] = useState("");

  const [valid, weight] = validate(newBarbell);
  const alreadyExists = dirtyBarBells.includes(weight);
  const outOfBounds = weight <= 0 || weight > 100;

  const isDirty =
    bars.length !== dirtyBarBells.length ||
    bars.some((b, index) => b !== dirtyBarBells[index]);

  useEffect(() => {
    setDirtyBarbells(bars);
  }, [bars]);

  useEffect(() => {
    if (visible) {
      setNewBarbell("");
    }
  }, [visible]);

  const saveChanges = () => {
    setBars([...dirtyBarBells]);
    toggle();
  };

  const addBarbell = () => {
    if (!valid || alreadyExists || outOfBounds) {
      return;
    }

    setDirtyBarbells([...dirtyBarBells, weight].sort((a, b) => a - b));
    setNewBarbell("");
  };

  const removeBarbell = (bar: number) => {
    setDirtyBarbells(dirtyBarBells.filter((b) => b !== bar));
  };

  const handleEnter = (key: string) => {
    if (key.toLowerCase() !== "enter") {
      return;
    }
    addBarbell();
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
            <ListItem
              secondaryAction={
                <IconButton
                  disabled={
                    !valid || alreadyExists || weight <= 0 || weight > 100
                  }
                  edge="end"
                  color="primary"
                  onClick={addBarbell}
                >
                  <AddIcon />
                </IconButton>
              }
            >
              <TextField
                fullWidth
                type="number"
                value={newBarbell}
                onChange={(e) => setNewBarbell(e.currentTarget.value)}
                onKeyPress={(e) => handleEnter(e.key)}
              />
            </ListItem>
            {dirtyBarBells.map((bar) => (
              <ListItem
                key={bar}
                secondaryAction={
                  <Badge
                    variant="dot"
                    color="success"
                    invisible={bars.includes(bar)}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="warning"
                      onClick={() => removeBarbell(bar)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Badge>
                }
              >
                <ListItemText color="yellow">
                  {`${bar} kg`}&nbsp;
                  {bar === weight && (
                    <Chip
                      label="Already exists"
                      color="warning"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="info"
            onClick={saveChanges}
            disabled={!isDirty || dirtyBarBells.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
