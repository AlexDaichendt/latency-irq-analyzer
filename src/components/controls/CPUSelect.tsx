import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Autocomplete, TextField } from "@mui/material";
import { setCurrentCPU } from "../../state/controls";

export default function CPUSelect() {
  const dispatch = useDispatch();
  const cpuAmount = useSelector((state: RootState) => state.irq.irqData.length);
  const selectedCPU = useSelector(
    (state: RootState) => state.controls.currentCPU
  );
  const options = new Array(cpuAmount)
    .fill(0)
    .map((_, i) => ({ label: `Core ${i}`, value: i }));

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 150, mt: 2 }}
      renderInput={(params) => (
        <TextField {...params} label="Select CPU number" />
      )}
      value={options[selectedCPU]}
      disableClearable
      onChange={(_, value) => {
        if (value) {
          const coreNumber = value.value;

          dispatch(setCurrentCPU(coreNumber));
        }
      }}
    />
  );
}
