import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DrawerAppBar from "../components/AppBar";
import IRQPlot from "../components/IRQPlot";
import InputFileUpload from "../components/UploadFile";
import PlotControl from "../components/controls/PlotControl";
import { RootState } from "../state/store";

function App() {
  const hasFile = useSelector((state: RootState) => state.irq.fileName !== "");

  return (
    <>
      <DrawerAppBar />

      <Box component="main" sx={{ p: 2 }}>
        <Typography variant="h1">IRQ Plotter</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Select a csv file of the interrupt recorder for plotting. Typically,
          this file can be found in
          /srv/testbed/results/NAME/default/DATE/DUTHOSTNAME/irqrecorder*.csv
          <br />
          IRQs without any activity are not shown. All caluclation is done in
          the browser; no data leaves your computer.
        </Typography>

        <InputFileUpload showInformation />

        {hasFile && (
          <>
            <PlotControl />
            <IRQPlot />
          </>
        )}
      </Box>
    </>
  );
}

export default App;
