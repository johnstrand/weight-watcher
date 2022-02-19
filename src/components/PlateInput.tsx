import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  increment: number;
  selectedWeight: number;
  onChange: (weight: number) => void;
};

export const PlateInput = (props: Props) => {
  const { increment, selectedWeight, onChange } = props;
  return (
    <>
      <Grid item xs={3} textAlign="center">
        <Button
          size="large"
          onClick={() => onChange(Math.max(selectedWeight - increment, 0))}
        >
          <RemoveIcon />
        </Button>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Plate weight"
          value={selectedWeight * 2}
          focused
          color="primary"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={3} textAlign="center">
        <Button
          size="large"
          onClick={() => onChange(selectedWeight + increment)}
        >
          <AddIcon />
        </Button>
      </Grid>
    </>
  );
};
