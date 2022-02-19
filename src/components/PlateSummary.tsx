import { Grid, Stack, Chip, Badge } from "@mui/material";
import { usePlates } from "../contexts/PlateContext";
import { sortNumbersInverse } from "../utils/helpers";

const getPlates = (
  wt: number,
  available: number[],
  displayZero: boolean = false
) => {
  const weights: [weight: number, count: number][] = [];
  for (let index = 0; index < available.length; index++) {
    const current = available[index];
    if (wt >= current) {
      const count = Math.floor(wt / current);
      weights.push([current, count]);
      wt -= current * count;
    } else if (displayZero) {
      weights.push([current, 0]);
    }
  }
  return weights;
};

type Props = {
  plateWeight: number;
};

export const PlateSummary = (props: Props) => {
  const [available] = usePlates();
  const weights = getPlates(
    props.plateWeight,
    available.sort(sortNumbersInverse)
  );
  return (
    <Grid item xs={12} textAlign="center">
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        {weights.length === 0 ? (
          <Chip label="Bar only" variant="outlined" color="primary" />
        ) : (
          weights.map(([wt, ct]) => (
            <Badge key={wt} badgeContent={ct} color="primary">
              <Chip label={wt} color="default" />
            </Badge>
          ))
        )}
      </Stack>
    </Grid>
  );
};
