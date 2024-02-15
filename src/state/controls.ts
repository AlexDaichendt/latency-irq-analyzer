import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ControlsSliceState {
  currentCPU: number;
  normalize: boolean;
}

const initialState: ControlsSliceState = {
  currentCPU: 0,
  normalize: false,
};

export const controlsSlice = createSlice({
  name: "irq",
  initialState,
  reducers: {
    setCurrentCPU: (state, action: PayloadAction<number>) => {
      state.currentCPU = action.payload;
    },
    setNormalize: (state, action: PayloadAction<boolean>) => {
      state.normalize = action.payload;
    },
  },
});

export const { setCurrentCPU, setNormalize } = controlsSlice.actions;

export default controlsSlice.reducer;
