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
import { useBarbells, validBarbellWeight } from "../../contexts/BarContext";
import { useEffect, useState } from "react";
import {
  hasDiff,
  onEnter,
  sortNumbers,
  tryValidateNo,
} from "../../utils/helpers";
import { CloseIcon, AddIcon, DeleteIcon } from "../Icons";

type Props = {
  visible: boolean;
  toggle: () => void;
};

export const BarbellEditor = (props: Props) => {
  const { visible, toggle } = props;
  const [barbells, setBarbells] = useBarbells();
  const [dirtyBarbells, setDirtyBarbells] = useState<number[]>([]);
  const [newBarbell, setNewBarbell] = useState("");

  const [valid, weight] = tryValidateNo(newBarbell);
  const alreadyExists = dirtyBarbells.includes(weight);
  const outOfBounds = !validBarbellWeight(weight);

  const isDirty = hasDiff(barbells, dirtyBarbells);

  useEffect(() => {
    setDirtyBarbells(barbells);
  }, [barbells]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    setNewBarbell("");
    setDirtyBarbells([...barbells]);
  }, [visible]);

  const saveChanges = () => {
    setBarbells([...dirtyBarbells]);
    toggle();
  };

  const addBarbell = () => {
    if (!valid || alreadyExists || outOfBounds) {
      return;
    }

    setDirtyBarbells([...dirtyBarbells, weight].sort(sortNumbers));
    setNewBarbell("");
  };

  const removeBarbell = (bar: number) => {
    setDirtyBarbells(dirtyBarbells.filter((b) => b !== bar));
  };

  return (
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
                disabled={!valid || alreadyExists || outOfBounds}
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
              onKeyPress={onEnter(addBarbell)}
            />
          </ListItem>
          {dirtyBarbells.map((bar) => (
            <ListItem
              key={bar}
              secondaryAction={
                <Badge
                  variant="dot"
                  color="success"
                  invisible={barbells.includes(bar)}
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
              <ListItemText>
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
          disabled={!isDirty || dirtyBarbells.length === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
