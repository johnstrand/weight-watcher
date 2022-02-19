import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useBar } from "../contexts/BarContext";
import { Pad } from "./Pad";

type Props = {
  selected: number;
  onSelect: (selected: number) => void;
};

export const BarPicker = (props: Props) => {
  const { selected, onSelect } = props;
  const [available] = useBar();
  return (
    <>
      <Pad size={3} />
      <Grid item xs={6}>
        <FormControl fullWidth focused>
          <InputLabel color="primary">Bar weight</InputLabel>
          <Select
            label="Bar weight"
            color="primary"
            value={selected}
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
