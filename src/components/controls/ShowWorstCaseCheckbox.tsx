import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShowWorstCase } from "../../state/controlsSlice";
import { RootState } from "../../state/store";

export default function ShowWorstCaseCheckbox() {
  const dispatch = useDispatch();
  const showWorstCase = useSelector(
    (state: RootState) => state.controls.showWorstCase
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowWorstCase(event.target.checked));
  };

  return (
    <FormControlLabel
      label="Show Worst Case"
      control={
        <Checkbox
          checked={showWorstCase}
          inputProps={{ "aria-label": "Show Worst Case" }}
          onChange={handleChange}
        />
      }
    />
  );
}
