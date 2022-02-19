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
import { useEffect, useState } from "react";
import { usePlates, validPlateWeight } from "../../contexts/PlateContext";
import {
  hasDiff,
  onEnter,
  removeNo,
  sortNumbersInverse,
  tryValidateNo,
} from "../../utils/helpers";
import { AddIcon, CloseIcon, DeleteIcon } from "../Icons";

type Props = {
  visible: boolean;
  toggle: () => void;
};

export const PlateEditor = (props: Props) => {
  const { visible, toggle } = props;
  const [plates, setPlates] = usePlates();
  const [dirtyPlates, setDirtyPlates] = useState<number[]>([]);
  const [newPlate, setNewPlate] = useState("");

  const [valid, weight] = tryValidateNo(newPlate, true);
  const alreadyExists = dirtyPlates.includes(weight);
  const outOfBounds = !validPlateWeight(weight);

  const isDirty = hasDiff(plates, dirtyPlates);

  useEffect(() => {
    setDirtyPlates(plates);
  }, [plates]);

  useEffect(() => {
    if (!visible) {
    }
    setNewPlate("");
    setDirtyPlates([...plates]);
  }, [visible]);

  const saveChanges = () => {
    setPlates([...dirtyPlates]);
    toggle();
  };

  const addPlate = () => {
    if (!valid || alreadyExists || outOfBounds) {
      return;
    }

    setDirtyPlates(
      [...dirtyPlates, Math.round(weight * 100) / 100].sort(sortNumbersInverse)
    );
    setNewPlate("");
  };

  const removePlate = (plate: number) => {
    setDirtyPlates(removeNo(plates, plate));
  };

  return (
    <Dialog open={visible} fullScreen scroll="paper">
      <DialogTitle>
        Edit available plates
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
                onClick={addPlate}
              >
                <AddIcon />
              </IconButton>
            }
          >
            <TextField
              fullWidth
              type="number"
              value={newPlate}
              onChange={(e) => setNewPlate(e.currentTarget.value)}
              onKeyPress={onEnter(addPlate)}
            />
          </ListItem>
          {dirtyPlates.map((plate) => (
            <ListItem
              key={plate}
              secondaryAction={
                <Badge
                  variant="dot"
                  color="success"
                  invisible={plates.includes(plate)}
                >
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="warning"
                    onClick={() => removePlate(plate)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Badge>
              }
            >
              <ListItemText>
                {`${plate} kg`}&nbsp;
                {plate === weight && (
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
          disabled={!isDirty || dirtyPlates.length === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
