import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useBarbells } from "../../contexts/BarContext";
import { Pad } from "../Pad";

type Props = {
  selected: number;
  onSelect: (selected: number) => void;
};

export const BarbellPicker = (props: Props) => {
  const { selected, onSelect } = props;
  const [available] = useBarbells();

  if (available.length === 0) {
    return (
      <>
        <Pad size={3} />
        <Grid item xs={6}>
          ¯\_(ツ)_/¯
        </Grid>
        <Pad size={3} />
      </>
    );
  }

  const safeSelected = available.includes(selected) ? selected : available[0];

  return (
    <>
      <Pad size={3} />
      <Grid item xs={6}>
        <FormControl fullWidth focused>
          <InputLabel color="primary">Bar weight</InputLabel>
          <Select
            label="Bar weight"
            color="primary"
            value={safeSelected}
            onChange={(e) => onSelect(e.target.value as number)}
          >
            {available.map((w) => (
              <MenuItem key={w} value={w}>{`${w} kg`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Pad size={3} />
    </>
  );
};
