import { Grid, TextField, InputAdornment } from "@mui/material";
import { Pad } from "./Pad";

type Props = {
  barWeight: number;
  plateWeight: number;
};

export const Total = (props: Props) => {
  const { barWeight, plateWeight } = props;
  return (
    <>
      <Pad size={3} />
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Total weight"
          value={2 * plateWeight + barWeight}
          focused
          color="success"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Grid>
      <Pad size={3} />
    </>
  );
};
