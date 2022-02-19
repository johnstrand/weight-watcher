import { Grid } from "@mui/material";

export const Spacer = ({ content }: { content: React.ReactNode }) => {
  return (
    <Grid item xs={12} textAlign="center">
      {content}
    </Grid>
  );
};
