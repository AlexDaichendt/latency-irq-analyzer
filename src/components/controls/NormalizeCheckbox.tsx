import { Checkbox, FormControlLabel } from "@mui/material";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setNormalize } from "../../state/controlsSlice";

export default function NormalizeCheckbox() {
  const dispatch = useDispatch();
  const normalize = useSelector((state: RootState) => state.controls.normalize);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNormalize(event.target.checked));
  };

  return (
    <FormControlLabel
      label="Normalize"
      control={
        <Checkbox
          checked={normalize}
          inputProps={{ "aria-label": "Normalize" }}
          onChange={handleChange}
        />
      }
    />
  );
}
