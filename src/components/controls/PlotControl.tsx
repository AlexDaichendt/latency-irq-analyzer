import { Box } from "@mui/material";
import CPUSelect from "./CPUSelect";
import NormalizeCheckbox from "./NormalizeCheckbox";
import ShowWorstCaseCheckbox from "./ShowWorstCaseCheckbox";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import WorstCaseSlider from "./WorstCaseSlider";

export default function PlotControl() {
  const hasWorstCaseFile = useSelector(
    (state: RootState) => state.worstcase.fileName !== ""
  );

  return (
    <>
      <Box display="flex" gap={4}>
        <CPUSelect />

        <NormalizeCheckbox />
        {hasWorstCaseFile && <ShowWorstCaseCheckbox />}
      </Box>
      <WorstCaseSlider />
    </>
  );
}
