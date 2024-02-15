import { Box } from "@mui/material";
import CPUSelect from "./CPUSelect";
import NormalizeCheckbox from "./NormalizeCheckbox";

export default function PlotControl() {
  return (
    <>
      <Box display="flex" gap={4}>
        <CPUSelect />

        <NormalizeCheckbox />
      </Box>
    </>
  );
}
