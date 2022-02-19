import { ThemeProvider } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { BarPicker } from "./components/BarPicker";
import { Spacer } from "./components/Spacer";
import { PlateInput } from "./components/PlateInput";
import { Total } from "./components/Total";
import { WeightSelection } from "./components/WeightSelection";
import { BarProvider } from "./contexts/BarContext";
import {
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { SettingsMenu } from "./components/SettingsMenu";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [requestedWeight, setRequestedWeight] = useState(0);
  const [barWeight, setBarWeight] = useState(20);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BarProvider>
        <Paper sx={{ height: "98vh" }} elevation={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <h1>Weight Picker</h1>
            </Grid>
            <Grid item xs={12}>
              <Divider>Bar and desired weight</Divider>
            </Grid>
            <BarPicker selected={barWeight} onSelect={setBarWeight} />
            <Spacer content={<AddIcon />} />
            <PlateInput
              increment={1.25}
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
            <WeightSelection plateWeight={requestedWeight} />
          </Grid>
        </Paper>
        <SettingsMenu />
      </BarProvider>
    </ThemeProvider>
  );
}

export default App;
