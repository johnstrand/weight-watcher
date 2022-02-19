import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { BarbellPicker } from "./components/Barbell/BarbellPicker";
import { Spacer } from "./components/Spacer";
import { PlateInput } from "./components/PlateInput";
import { Total } from "./components/Total";
import { PlateSummary } from "./components/PlateSummary";
import {
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { SettingsMenu } from "./components/SettingsMenu";
import { usePlates } from "./contexts/PlateContext";
import { AddIcon, ArrowDownwardIcon } from "./components/Icons";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [requestedWeight, setRequestedWeight] = useState(0);
  const [barWeight, setBarWeight] = useState(20);
  const [plates] = usePlates();
  const increment = plates[plates.length - 1];

  useEffect(() => {
    setRequestedWeight(0);
  }, [plates]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{ height: "98vh" }} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <h1>Weight Picker</h1>
          </Grid>
          <Grid item xs={12}>
            <Divider>Bar and desired weight</Divider>
          </Grid>
          <BarbellPicker selected={barWeight} onSelect={setBarWeight} />
          <Spacer content={<AddIcon />} />
          <PlateInput
            increment={increment}
            selectedWeight={requestedWeight}
            onChange={setRequestedWeight}
          />
          <Spacer content={<ArrowDownwardIcon />} />
          <Total barWeight={barWeight} plateWeight={requestedWeight} />
          <Spacer
            content={
              <Button
                size="large"
                color="error"
                onClick={() => setRequestedWeight(0)}
              >
                Reset
              </Button>
            }
          />
          <Spacer content={<Divider>Weights (per side)</Divider>} />
          <PlateSummary plateWeight={requestedWeight} />
        </Grid>
      </Paper>
      <SettingsMenu />
    </ThemeProvider>
  );
}

export default App;
