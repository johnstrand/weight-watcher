import { Grid } from "@mui/material";

type Props = {
  size: number;
};

export const Pad = ({ size }: Props) => {
  return <Grid xs={3} item />;
};
