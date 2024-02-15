import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setWorstCaseOffset } from "../../state/controlsSlice";
import { RootState } from "../../state/store";

export default function WorstCaseSlider() {
  const dispatch = useDispatch();
  const worstCaseOffset = useSelector(
    (state: RootState) => state.controls.worstCaseOffset
  );
  const worstCaseData = useSelector((state: RootState) => state.worstcase.data);
  const irqData = useSelector((state: RootState) => state.irq.irqData);

  const lastIrqTs =
    irqData[0]?.timestamp_us[irqData[0].timestamp_us.length - 1] / 1000000;
  const lastWorstCaseTs =
    worstCaseData[worstCaseData.length - 1]?.prets / 1000000000;

  const max = lastIrqTs - lastWorstCaseTs;

  const handleWorstCaseOffsetChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    console.log("newValue", newValue);
    dispatch(setWorstCaseOffset(newValue as number));
  };

  return (
    <Slider
      size="small"
      value={worstCaseOffset}
      aria-label="Small"
      valueLabelDisplay="auto"
      step={0.2}
      max={max}
      onChange={handleWorstCaseOffsetChange}
    />
  );
}
